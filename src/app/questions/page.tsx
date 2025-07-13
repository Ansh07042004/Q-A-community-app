import { QuestionCard } from '@/components/question-card';
import { questions } from '@/lib/mock-data';
import { BookOpenText } from 'lucide-react';

export default function QuestionsPage() {
  return (
    <div className="py-12 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
          <BookOpenText className="h-10 w-10 text-primary" />
          All Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Browse through all questions asked by the community.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
