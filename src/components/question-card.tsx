import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Question } from "@/lib/types";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuestionCard({ question, className }: { question: Question, className?: string }) {
  const totalUpvotes = question.answers.reduce((sum, answer) => sum + answer.upvotes, 0);

  return (
    <Link href={`/questions/${question.id}`} className="group block">
      <Card className={cn("h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:shadow-primary/10", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>{question.topic}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {question.answers.length}
              </div>
              <span className="mx-1">·</span>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {totalUpvotes}
              </div>
            </div>
          </div>
          <CardTitle className="font-headline text-xl pt-2">{question.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="line-clamp-3">
            {question.content}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar className="h-8 w-8">
              <AvatarImage src={question.avatarUrl} alt={question.author} data-ai-hint="avatar" />
              <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium text-foreground">{question.author}</span> asked {question.timestamp}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
