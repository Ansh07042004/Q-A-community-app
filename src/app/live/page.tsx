
import Link from "next/link";
import { liveDiscussions } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LiveDiscussionsHubPage() {
  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <Radio className="mx-auto h-16 w-16 text-primary" />
          <h1 className="font-headline text-5xl font-bold mt-4">Live Discussions</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Join a conversation, share your knowledge, or start your own study group.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveDiscussions.map((discussion) => (
            <Link key={discussion.id} href={`/live/${discussion.id}`} className="group block">
                <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:shadow-primary/10">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{discussion.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{discussion.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                       <Badge>{discussion.topic}</Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm">
                       <div className="flex items-center gap-2 text-muted-foreground">
                           <Users className="h-4 w-4" />
                           <span>{discussion.participants} Participants</span>
                       </div>
                       <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                           <span>Join</span>
                           <ArrowRight className="h-4 w-4" />
                       </div>
                    </CardFooter>
                </Card>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
