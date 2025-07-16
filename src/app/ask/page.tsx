"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PenSquare, Info, LoaderCircle, Sparkles, BrainCircuit } from "lucide-react";
import { findSimilarQuestion, type FindSimilarQuestionOutput } from "@/ai/flows/find-similar-question";
import { answerQuestion } from "@/ai/flows/answer-question";
import { questions } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isGettingAnswer, setIsGettingAnswer] = useState(false);
  const [suggestion, setSuggestion] = useState<FindSimilarQuestionOutput | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTitleBlur = async () => {
    if (title.trim().length < 10) {
      setSuggestion(null);
      return;
    }

    setIsChecking(true);
    setSuggestion(null);
    try {
      const existingQuestions = questions.map(q => ({
        id: q.id,
        title: q.title,
        content: q.content,
        answers: q.answers.map(a => ({ id: a.id, content: a.content, upvotes: a.upvotes })),
      }));

      const result = await findSimilarQuestion({
        newQuestionTitle: title,
        existingQuestions: existingQuestions,
      });

      if (result.isSimilar && result.bestAnswer) {
        setSuggestion(result);
      }
    } catch (error) {
      console.error("Failed to check for similar questions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not check for similar questions. Please try again.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleGetAiAnswer = async () => {
    if (title.trim().length < 10) {
      toast({
        variant: "destructive",
        title: "Question is too short",
        description: "Please provide more detail in your question title.",
      });
      return;
    }

    setIsGettingAnswer(true);
    setAiAnswer(null);
    try {
        const result = await answerQuestion({ question: title });
        setAiAnswer(result.answer);
    } catch (error) {
       console.error("Failed to get AI answer:", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate an AI answer. Please try again.",
      });
    } finally {
        setIsGettingAnswer(false);
    }
  };


  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <PenSquare className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-3xl">Ask a Public Question</CardTitle>
                <CardDescription>Share your query with the community to get help.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-semibold">Question Title</Label>
                <p className="text-sm text-muted-foreground">Be specific and imagine you’re asking a question to another person.</p>
                <div className="relative">
                  <Input 
                    id="title" 
                    placeholder="e.g. How to implement a binary search tree in Python?" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                  />
                  {isChecking && <LoaderCircle className="animate-spin h-5 w-5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />}
                </div>
              </div>

              {suggestion && (
                <Alert variant="default" className="bg-primary/5 border-primary/20">
                   <Sparkles className="h-4 w-4 text-primary" />
                  <AlertTitle className="font-headline text-lg text-primary">Is this what you're looking for?</AlertTitle>
                  <AlertDescription className="text-foreground/90 space-y-2">
                    <p>{suggestion.justification}</p>
                    <div className="p-4 border bg-background/50 rounded-md">
                        <p className="font-semibold">Here is a top-rated answer:</p>
                        <p className="mt-1">"{suggestion.bestAnswer}"</p>
                    </div>
                    <Button variant="link" asChild className="p-0 h-auto">
                      <Link href={`/questions/${suggestion.similarQuestionId}`}>
                        View the original question and its other answers.
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Want a quick answer while you wait for the community?</p>
                  <Button type="button" variant="secondary" onClick={handleGetAiAnswer} disabled={isGettingAnswer || title.trim().length < 10}>
                      {isGettingAnswer ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                      {isGettingAnswer ? "Thinking..." : "Get an Instant AI Answer"}
                  </Button>
              </div>

              {aiAnswer && (
                 <Alert variant="default" className="bg-accent/10 border-accent/20">
                   <BrainCircuit className="h-4 w-4 text-accent-foreground" />
                  <AlertTitle className="font-headline text-lg text-accent-foreground">Instant AI Answer</AlertTitle>
                  <AlertDescription className="text-foreground/90 space-y-2 whitespace-pre-wrap">
                    {aiAnswer}
                  </AlertDescription>
                </Alert>
              )}

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="topic" className="text-lg font-semibold">Topic</Label>
                <p className="text-sm text-muted-foreground">Choose a topic that best fits your question.</p>
                <Select>
                  <SelectTrigger id="topic" suppressHydrationWarning>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body" className="text-lg font-semibold">Detailed Description</Label>
                <p className="text-sm text-muted-foreground">Include all the information someone would need to answer your question.</p>
                <Textarea id="body" rows={10} placeholder="Provide details about what you've tried, what you're expecting, and any error messages." />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isChecking}>
                  {isChecking ? "Analyzing..." : "Post Your Question"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
