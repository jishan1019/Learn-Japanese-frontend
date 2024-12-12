"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/loader";
import { useGetAllLessonQuery } from "@/redux/features/lesson/lessonApi";

export default function Lesson() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "number" },
  ];

  const { data, isLoading, error } = useGetAllLessonQuery(queryParams);

  if (isLoading) {
    return <Loader />;
  }

  const lessons = data?.data?.result || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl md:text-3xl font-bold mb-8 ml-2">Lessons</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 m-3">
        {lessons?.map((lesson: any) => (
          <Card key={lesson?._id} className="flex flex-col">
            <CardHeader>
              <CardTitle>
                Lesson {lesson?.number}: {lesson?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-2">
                Total Vocabulary: {lesson?.vocabulary}
              </p>
              <p className="text-sm text-muted-foreground">
                Created on {format(new Date(lesson?.createdAt), "MMMM d, yyyy")}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-500"
                onClick={() => router.push(`/lesson/${lesson?.number}`)}
              >
                Learn
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
