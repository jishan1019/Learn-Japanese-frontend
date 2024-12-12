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
import { useCreateLessonMutation } from "@/redux/features/lesson/lessonApi";
import { toast } from "sonner";

const lessonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.number().min(1, "Number must be at least 1"),
});

export default function AddLesson() {
  const router = useRouter();
  const [addLesson] = useCreateLessonMutation();

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      number: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof lessonSchema>) {
    const result = await addLesson(values).unwrap();
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    } else {
      toast.error((result?.error as any)?.data?.message);
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="mx-auto py-10 p-4 w-[90%] md:w-[50%] shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-5">Add New Lesson</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cultural Expressions" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the lesson
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Enter the lesson number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Lesson</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
