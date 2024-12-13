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
import { useCreateTutorialMutation } from "@/redux/features/tutorial/tutorialApi";
import { toast } from "sonner";

const tutorialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required"),
});

export default function AddTutorial() {
  const router = useRouter();
  const [addTutorial] = useCreateTutorialMutation();

  const form = useForm<z.infer<typeof tutorialSchema>>({
    resolver: zodResolver(tutorialSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof tutorialSchema>) {
    try {
      await addTutorial(values).unwrap();
      toast.success("Tutorial Added successfully");
    } catch (error) {
      toast.error("Failed to add tutorial");
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="p-4 w-[90%] md:w-[50%] shadow-md bg-white mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">Add New Tutorial</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Every Morning Japanese Conversation Practice To Start The Day"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter the tutorial title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=hVOvyR3fSrU"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter the YouTube video URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Easy way to learn and talk Japanese language"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the tutorial
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Tutorial</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
