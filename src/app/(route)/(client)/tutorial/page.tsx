"use client";

import { useState } from "react";
import Image from "next/image";
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

import { useGetAllTutorialQuery } from "@/redux/features/tutorial/tutorialApi";
import { YouTubeModal } from "@/components/youtube-modal";

export default function Tutorial() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
  ];

  const { data, isLoading, error } = useGetAllTutorialQuery(queryParams);

  if (isLoading) {
    return <Loader />;
  }

  const tutorials = data?.data?.result || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl md:text-3xl font-bold mb-8 ml-3">Tutorials</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials?.map((tutorial: any) => (
          <YouTubeModal key={tutorial?._id} videoUrl={tutorial?.videoUrl}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{tutorial?.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <Image
                  src={`https://img.youtube.com/vi/${
                    tutorial?.videoUrl?.split("v=")?.[1]
                  }/0.jpg`}
                  alt={tutorial?.title}
                  width={320}
                  height={180}
                  className="w-full object-cover mb-4 rounded-md"
                />
                <p className="text-muted-foreground">{tutorial?.description}</p>
              </CardContent>

              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Created on{" "}
                  {format(new Date(tutorial?.createdAt), "MMMM d, yyyy")}
                </p>
              </CardFooter>
            </Card>
          </YouTubeModal>
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
