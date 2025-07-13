import Link from 'next/link';
import { ArrowRight, BookOpenText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/question-card';
import { questions } from '@/lib/mock-data';
import { SearchInput } from '@/components/search-input';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-20 md:py-32 border-b">
        <div className="px-4 md:px-6 text-center">
          <div className="relative inline-block mb-8">
            <GraduationCap className="h-24 w-24 md:h-32 md:w-32 text-primary animate-[float_6s_ease-in-out_infinite]" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground-on-card">
            Welcome to CampusConnect
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Your hub for collaborative learning. Ask questions, share knowledge, and connect with fellow students.
          </p>
          <div className="mt-8 max-w-xl mx-auto flex gap-2">
            <SearchInput 
              placeholder="Search for questions, topics, or keywords..." 
              className="h-12 text-base pl-10"
              containerClassName="flex-grow"
            />
            <Button size="lg" asChild>
              <Link href="/ask">
                Ask a Question
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-3xl font-bold flex items-center gap-3">
              <BookOpenText className="h-8 w-8 text-primary" />
              Recent Questions
            </h2>
            <Button variant="link" asChild>
              <Link href="/questions">
                Browse all questions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
