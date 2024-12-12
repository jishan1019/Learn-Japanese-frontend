"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface YouTubeModalProps {
  videoUrl: string;
  children: React.ReactNode;
}

export function YouTubeModal({ videoUrl, children }: YouTubeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const videoId = videoUrl?.split("v=")?.[1];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <div className="aspect-video m-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
