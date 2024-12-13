"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateVocabularyMutation } from "@/redux/features/vocabulary/vocabularyApi";
import { toast } from "sonner";
import { useGetAllLessonQuery } from "@/redux/features/lesson/lessonApi";

const vocabularySchema = z.object({
  word: z.string().min(1, "Word is required"),
  meaning: z.string().min(1, "Meaning is required"),
  pronunciation: z.string().min(1, "Pronunciation is required"),
  whenToSay: z.string().min(1, "When to say is required"),
  lesson: z.string().min(1, "Lesson number is required"),
});

export default function AddVocabulary() {
  const [addVocabulary] = useCreateVocabularyMutation();

  const limit = 10000;

  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: limit },
  ];

  const { data: lessons } = useGetAllLessonQuery(queryParams);

  console.log(lessons?.data?.result);

  const form = useForm<z.infer<typeof vocabularySchema>>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: {
      word: "",
      meaning: "",
      pronunciation: "",
      whenToSay: "",
      lesson: "",
    },
  });

  async function onSubmit(values: z.infer<typeof vocabularySchema>) {
    try {
      await addVocabulary(values).unwrap();
      toast.success("Vocabulary Added successfully");
    } catch (error: any) {
      toast.error("Failed to add vocabulary");
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="p-4 w-[90%] md:w-[50%] shadow-md bg-white mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Add New Vocabulary</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input placeholder="こんにちは" {...field} />
                  </FormControl>
                  <FormDescription>Enter the Japanese word</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meaning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meaning</FormLabel>
                  <FormControl>
                    <Input placeholder="Hello" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the English translation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pronunciation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronunciation</FormLabel>
                  <FormControl>
                    <Input placeholder="Konnichiwa" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the pronunciation in romaji
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whenToSay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When to Say</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Used for greeting" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe when to use this word
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lesson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Number</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)} // Store _id in the form value
                      className="form-select w-full p-2 border rounded-md"
                    >
                      <option value="" disabled>
                        Select a lesson
                      </option>
                      {lessons?.data?.result?.map((lesson: any) => (
                        <option key={lesson._id} value={lesson._id}>
                          Lesson {lesson.number}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormDescription>
                    Select the associated lesson number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add Vocabulary</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
