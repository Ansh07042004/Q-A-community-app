import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Users, ThumbsUp, MessageSquare, Share2, Megaphone, CalendarDays } from "lucide-react";
import Image from "next/image";

const feedItems = [
    {
        type: 'announcement',
        author: 'University Admin',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'Heads up, students! The annual Spring Fling is happening next Friday at the main quad. Get ready for live music, food trucks, and games. Festivities kick off at 3 PM. See you there! 🎪🎶',
        timestamp: '2 hours ago',
        icon: Megaphone,
    },
    {
        type: 'event',
        author: 'Computer Science Club',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'Join our annual Hackathon event! Form teams and build something amazing in 24 hours. Prizes for the best projects. All majors welcome. RSVP to secure your spot.',
        timestamp: '8 hours ago',
        icon: CalendarDays,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'hackathon event',
        likes: 45,
        comments: 12,
    },
    {
        type: 'post',
        author: 'Samantha Bee',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'Just finished my mid-term for Quantum Physics. It was tough, but I think I did well! Huge thanks to everyone in the study group. Couldn\'t have done it without you all. Now, time for a long nap... 😴',
        timestamp: '1 day ago',
        likes: 128,
        comments: 23,
    },
     {
        type: 'post',
        author: 'Leo Valdez',
        avatarUrl: 'https://placehold.co/100x100.png',
        content: 'Anyone selling a used copy of "Introduction to Algorithms"? The bookstore is sold out. DM me if you have one to spare!',
        timestamp: '2 days ago',
        likes: 15,
        comments: 5,
    },
];

export default function FeedPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
          <Users className="h-10 w-10 text-primary" />
          Campus Feed
        </h1>
        <p className="text-muted-foreground mt-2">
          See what's happening in your college community.
        </p>
      </header>

      <main className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Textarea placeholder="What's on your mind?" className="flex-1" rows={3}/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Post</Button>
          </CardFooter>
        </Card>

        {feedItems.map((item, index) => (
          <Card key={index} className="shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={item.avatarUrl} alt={item.author} data-ai-hint="avatar" />
                  <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                </div>
                {item.type !== 'post' && (
                    <div className="ml-auto flex items-center gap-2 text-primary">
                        <item.icon className="h-5 w-5" />
                        <span className="font-semibold text-sm uppercase tracking-wider">{item.type}</span>
                    </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-wrap">{item.content}</p>
              {item.type === 'event' && item.imageUrl && (
                <div className="mt-4 rounded-lg overflow-hidden border">
                    <Image src={item.imageUrl} alt="Event Image" width={600} height={400} className="object-cover" data-ai-hint={item.imageHint}/>
                </div>
              )}
            </CardContent>
            {(item.type === 'post' || item.type === 'event') && (
              <CardFooter className="flex justify-between items-center border-t pt-4 mt-4">
                <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground">
                  <ThumbsUp className="h-5 w-5" /> {item.likes}
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-5 w-5" /> {item.comments}
                </Button>
                <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="h-5 w-5" /> Share
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </main>
    </div>
  );
}
