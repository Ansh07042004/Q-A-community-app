"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Answer } from "@/lib/types";
import { ArrowBigUp, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnswerCard({ answer }: { answer: Answer }) {
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    } else {
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
  };

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
        <Button variant={isUpvoted ? "default" : "outline"} onClick={handleUpvote} className="transition-all">
          <ArrowBigUp className={cn("h-5 w-5 mr-2", isUpvoted && "fill-current")} />
          <span>Upvote</span>
        </Button>
        <div className="flex items-center gap-2 text-muted-foreground font-medium">
          <ThumbsUp className="h-5 w-5 text-primary" />
          <span>{upvotes.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
