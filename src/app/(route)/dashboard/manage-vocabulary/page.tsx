"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useDeleteVocabularyMutation,
  useGetAllVocabularyQuery,
  useUpdateVocabularyMutation,
} from "@/redux/features/vocabulary/vocabularyApi";
import Loader from "@/components/loader";
import { toast } from "sonner";

const vocabularySchema = z.object({
  word: z.string().min(1, "Word is required"),
  meaning: z.string().min(1, "Meaning is required"),
  pronunciation: z.string().min(1, "Pronunciation is required"),
  whenToSay: z.string().min(1, "When to say is required"),
  lesson: z.string().min(1, "Lesson ID is required"),
});

export default function ManageVocabulary() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
  ];

  const {
    data: vocabularies,
    isLoading,
    error,
  } = useGetAllVocabularyQuery(queryParams);

  const totalPages = vocabularies?.data?.meta?.totalPage || 1;

  const [updateVocabulary] = useUpdateVocabularyMutation();
  const [deleteVocabulary] = useDeleteVocabularyMutation();
  const [selectedVocabulary, setSelectedVocabulary] = useState(null) as any;

  const form = useForm<z.infer<typeof vocabularySchema>>({
    resolver: zodResolver(vocabularySchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  async function onSubmit(values: z.infer<typeof vocabularySchema>) {
    try {
      await updateVocabulary({
        _id: selectedVocabulary._id,
        ...values,
      }).unwrap();

      setSelectedVocabulary(null);
      toast.success("Vocabulary updated successfully");
    } catch (error: any) {
      toast.error("Failed to update vocabulary");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteVocabulary(id).unwrap();
      toast.success("Vocabulary delete successfully");
    } catch (error: any) {
      toast.error("Failed to delete vocabulary");
    }
  }

  return (
    <div className="px-8 shadow-md m-5 w-full border mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Manage Vocabulary</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead>Meaning</TableHead>
            <TableHead>Pronunciation</TableHead>
            <TableHead>When to Say</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vocabularies?.data?.result?.map((vocabulary: any) => (
            <TableRow key={vocabulary._id}>
              <TableCell>{vocabulary.word}</TableCell>
              <TableCell>{vocabulary.meaning}</TableCell>
              <TableCell>{vocabulary.pronunciation}</TableCell>
              <TableCell>{vocabulary.whenToSay}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedVocabulary(vocabulary)}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Vocabulary</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="word"
                          defaultValue={vocabulary.word}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Word</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="meaning"
                          defaultValue={vocabulary.meaning}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Meaning</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pronunciation"
                          defaultValue={vocabulary.pronunciation}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pronunciation</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="whenToSay"
                          defaultValue={vocabulary.whenToSay}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>When to Say</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lesson"
                          defaultValue={vocabulary?.lesson?._id}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lesson ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Update Vocabulary</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(vocabulary._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-8 space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((prev) => Math?.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span>
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((prev) => Math?.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
