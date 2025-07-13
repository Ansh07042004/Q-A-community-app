import { notFound } from "next/navigation";
import { findQuestionById } from "@/lib/mock-data";
import type { Question, Answer as AnswerType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnswerCard } from "@/components/answer-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiSummary } from "@/components/ai-summary";

export default function QuestionPage({ params }: { params: { id: string } }) {
  const question = findQuestionById(params.id);

  if (!question) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <article>
        <header className="mb-8">
          <Badge style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}} className="mb-2">{question.topic}</Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-4">{question.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar className="h-9 w-9">
              <AvatarImage src={question.avatarUrl} alt={question.author} data-ai-hint="avatar" />
              <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              Asked by <span className="font-medium text-foreground">{question.author}</span>
              <span className="mx-1">·</span>
              <span>{question.timestamp}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
          <p>{question.content}</p>
        </div>
      </article>

      <Separator className="my-10" />
      
      <AiSummary question={question} />

      <section className="mt-10">
        <h2 className="font-headline text-2xl font-bold mb-6">
          {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>
        <div className="space-y-6">
          {question.answers.sort((a, b) => b.upvotes - a.upvotes).map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="font-headline text-2xl font-bold mb-4">Your Answer</h2>
        <form className="grid gap-4">
          <Textarea rows={8} placeholder="Write your detailed answer here..." />
          <div className="flex justify-end">
            <Button size="lg">Post Your Answer</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
