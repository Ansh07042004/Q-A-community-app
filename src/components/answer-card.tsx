
"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Answer } from "@/lib/types";
import { ArrowBigUp, ThumbsUp, Volume2, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";

export function AnswerCard({ answer }: { answer: Answer }) {
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
  };

  const handleListen = async () => {
    if (audioUrl) {
      audioRef.current?.play();
      return;
    }

    setIsSynthesizing(true);
    try {
      const response = await textToSpeech(answer.content);
      setAudioUrl(response.media);
    } catch (error) {
      console.error("Failed to synthesize speech:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate audio. Please try again later.",
      });
    } finally {
      setIsSynthesizing(false);
    }
  };
  
  // Effect to play audio once the URL is set
  React.useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar className="h-10 w-10">
              <AvatarImage src={answer.avatarUrl} alt={answer.author} data-ai-hint="avatar" />
              <AvatarFallback>{answer.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-base">{answer.author}</p>
              <p>Answered {answer.timestamp}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none text-foreground/90">
          <p>{answer.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button variant={isUpvoted ? "default" : "outline"} onClick={handleUpvote} className="transition-all">
                <ArrowBigUp className={cn("h-5 w-5 mr-2", isUpvoted && "fill-current")} />
                <span>Upvote</span>
            </Button>
            <Button variant="outline" onClick={handleListen} disabled={isSynthesizing}>
              {isSynthesizing ? (
                <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Volume2 className="h-5 w-5 mr-2" />
              )}
              <span>{isSynthesizing ? 'Generating...' : 'Listen'}</span>
            </Button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <ThumbsUp className="h-5 w-5 text-primary" />
          <span>{upvotes.toLocaleString()}</span>
        </div>
        <audio ref={audioRef} className="hidden" />
      </CardFooter>
    </Card>
  );
}
