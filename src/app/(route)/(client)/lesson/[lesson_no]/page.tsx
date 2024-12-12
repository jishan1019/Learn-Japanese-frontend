"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/loader";
import { useGetVocabularyByLessonNoQuery } from "@/redux/features/vocabulary/vocabularyApi";

export default function LessonNo() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const limit = 1;

  const queryParams = [
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "lessonNo", value: params?.lesson_no },
  ];

  const { data, isLoading, error } =
    useGetVocabularyByLessonNoQuery(queryParams);

  if (isLoading) {
    return <Loader />;
  }

  const vocabulary = data?.data?.result[0];
  const totalPages = data?.data?.meta?.totalPage || 1;

  const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  const playPronunciation = (pronunciation: string) => {
    pronounceWord(pronunciation);
  };

  const handleComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.push("/lesson");
    }, 3000);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl md:text-3xl font-bold mb-8 ml-2">
        Lesson {params?.lesson_no}: {vocabulary?.lesson?.name}
      </h1>
      <Card className="max-w-2xl mx-auto m-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{vocabulary?.word}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => playPronunciation(vocabulary?.pronunciation)}
            >
              <Volume2 className="h-6 w-6" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Meaning:</strong> {vocabulary?.meaning}
          </p>
          <p>
            <strong>Pronunciation:</strong> {vocabulary?.pronunciation}
          </p>
          <p>
            <strong>When to Say:</strong> {vocabulary?.whenToSay}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {page === totalPages ? (
            <Button onClick={handleComplete} className="bg-green-500">
              Complete
            </Button>
          ) : (
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="text-center mt-4">
        Vocabulary {page} of {totalPages}
      </div>
    </div>
  );
}
