
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser, questions } from "@/lib/mock-data";
import { QuestionCard } from "@/components/question-card";
import { Award, HelpCircle, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const userQuestions = questions.filter(q => q.author === currentUser.name);
  const userAnsweredQuestionIds = new Set(questions.flatMap(q => q.answers.filter(a => a.author === currentUser.name).map(() => q.id)));
  const userAnswers = questions.filter(q => userAnsweredQuestionIds.has(q.id));

  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg mb-8">
          <CardHeader className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-28 w-28 border-4 border-primary">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="avatar" />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <CardTitle className="font-headline text-4xl">{currentUser.name}</CardTitle>
              <CardDescription className="text-lg mt-1">{currentUser.major} - Year {currentUser.year}</CardDescription>
              <div className="flex justify-center md:justify-start items-center gap-6 mt-4 text-muted-foreground">
                <div className="text-center">
                    <p className="font-bold text-2xl text-foreground">{userQuestions.length}</p>
                    <p>Questions</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl text-foreground">{userAnswers.length}</p>
                    <p>Answers</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-2xl text-foreground">1,280</p>
                    <p>Reputation</p>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
                <Link href="/profile/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                </Link>
            </Button>
          </CardHeader>
        </Card>

        <Tabs defaultValue="questions">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="questions">
                <HelpCircle className="h-4 w-4 mr-2" />
                My Questions
            </TabsTrigger>
            <TabsTrigger value="answers">
                <MessageSquare className="h-4 w-4 mr-2" />
                My Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="questions">
            <Card>
                <CardHeader>
                    <CardTitle>Questions you've asked</CardTitle>
                    <CardDescription>All the questions you have posted to the community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {userQuestions.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {userQuestions.map((question) => (
                                <QuestionCard key={question.id} question={question} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-8 text-center">You haven't asked any questions yet.</p>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="answers">
             <Card>
                <CardHeader>
                    <CardTitle>Questions you've answered</CardTitle>
                    <CardDescription>All the questions you have contributed answers to.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {userAnswers.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {userAnswers.map((question) => (
                                <QuestionCard key={question.id} question={question} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-8 text-center">You haven't answered any questions yet.</p>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
