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
  FormFormLabel,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteTutorialMutation,
  useGetAllTutorialQuery,
  useUpdateTutorialMutation,
} from "@/redux/features/tutorial/tutorialApi";
import Loader from "@/components/loader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const tutorialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url("Must be a valid URL"),
  description: z.string().min(1, "Description is required"),
});

export default function ManageTutorials() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
  ];

  const {
    data: tutorials,
    isLoading,
    error,
  } = useGetAllTutorialQuery(queryParams);
  const [updateTutorial] = useUpdateTutorialMutation();
  const [deleteTutorial] = useDeleteTutorialMutation();
  const [selectedTutorial, setSelectedTutorial] = useState(null) as any;

  const form = useForm<z.infer<typeof tutorialSchema>>({
    resolver: zodResolver(tutorialSchema),
  });

  if (isLoading) {
    return <Loader />;
  }

  const totalPages = tutorials?.data?.meta?.totalPage || 1;

  async function onSubmit(values: z.infer<typeof tutorialSchema>) {
    try {
      await updateTutorial({ _id: selectedTutorial?._id, ...values }).unwrap();
      toast.success("Tutorial updated successfully");

      setSelectedTutorial(null);
    } catch (error) {
      toast.error("Failed to update tutorial");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTutorial(id).unwrap();

      toast.success("Tutorial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tutorial");
    }
  }

  return (
    <div className=" mx-auto py-10 px-8 shadow-md m-5 w-full border overflow-y-auto">
      <h1 className="text-2xl font-bold mb-5">Manage Tutorials</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Video URL</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutorials?.data?.result?.map((tutorial: any) => (
            <TableRow key={tutorial._id}>
              <TableCell>{tutorial.title}</TableCell>
              <TableCell>{tutorial.videoUrl}</TableCell>
              <TableCell>{tutorial.description}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTutorial(tutorial)}
                    >
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Tutorial</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="title"
                          defaultValue={tutorial.title}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="videoUrl"
                          defaultValue={tutorial.videoUrl}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video URL</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          defaultValue={tutorial.description}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Update Tutorial</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(tutorial._id)}
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
