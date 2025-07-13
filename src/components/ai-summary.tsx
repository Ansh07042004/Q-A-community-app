"use client";

import { useState } from "react";
import { Sparkles, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Question } from "@/lib/types";
import { summarizeAnswers } from "@/ai/flows/summarize-answers";
import { Skeleton } from "./ui/skeleton";

export function AiSummary({ question }: { question: Question }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');

    if(question.answers.length === 0) {
        toast({
            variant: "destructive",
            title: "Not enough answers",
            description: "There are no answers to summarize yet.",
        });
        setIsLoading(false);
        return;
    }

    try {
      const result = await summarizeAnswers({ 
        question: question.title, 
        answers: question.answers.map(a => a.content) 
      });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI summary. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20 shadow-lg">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-2xl">AI-Powered Summary</CardTitle>
        </div>
        <Button onClick={handleSummarize} disabled={isLoading}>
          <BrainCircuit className="h-4 w-4 mr-2" />
          {isLoading ? "Generating..." : "Generate Summary"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {summary && !isLoading && (
          <div className="prose dark:prose-invert max-w-none text-foreground/90">
            <p>{summary}</p>
          </div>
        )}
        {!summary && !isLoading && (
            <p className="text-muted-foreground">Click "Generate Summary" to get an AI-powered overview of the answers below.</p>
        )}
      </CardContent>
    </Card>
  );
}
