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
import {
  useDeleteLessonMutation,
  useGetAllLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/features/lesson/lessonApi";
import { ChevronLeft, ChevronRight, UndoIcon } from "lucide-react";
import Loader from "@/components/loader";
import { toast } from "sonner";

const lessonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.number().min(1, "Number must be at least 1"),
});

export default function ManageLessons() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
  ];

  const { data: lessons, isLoading, error } = useGetAllLessonQuery(queryParams);

  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const totalPages = lessons?.data?.meta?.totalPage || 1;

  const [selectedLesson, setSelectedLesson] = useState(null) as any;

  const form = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  async function onSubmit(values: z.infer<typeof lessonSchema>) {
    try {
      await updateLesson({ _id: selectedLesson?._id, ...values }).unwrap();
      toast.success("Lesson updated successfully");
      setSelectedLesson(null);
    } catch (error) {
      console.error("Failed to update lesson:", error);
      toast.error("Failed to update lesson");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteLesson(id).unwrap();
      toast.success("Lesson delete successfully");
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      toast.error("Failed to delete lesson");
    }
  }

  return (
    <div className="mx-auto py-10 px-8 shadow-md m-5 w-full border">
      <h1 className="text-2xl font-bold mb-5">Manage Lessons</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons?.data?.result?.map((lesson: any) => (
            <TableRow key={lesson?._id}>
              <TableCell>{lesson?.name}</TableCell>
              <TableCell>{lesson?.number}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLesson(lesson)}
                      className="mr-3"
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Lesson</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          defaultValue={lesson?.name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="number"
                          defaultValue={lesson?.number}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Update Lesson</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(lesson._id)}
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
