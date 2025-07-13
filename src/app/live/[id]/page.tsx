
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, Send, Users } from "lucide-react";

const participants = [
  { name: "Alice J.", avatar: "https://placehold.co/100x100.png" },
  { name: "Charlie B.", avatar: "https://placehold.co/100x100.png" },
  { name: "Diana M.", avatar: "https://placehold.co/100x100.png" },
  { name: "Fiona G.", avatar: "https://placehold.co/100x100.png", isCurrentUser: true },
  { name: "Hannah W.", avatar: "https://placehold.co/100x100.png" },
];

const messages = [
    { author: "Alice J.", content: "Hey everyone, what's the topic for today's discussion?", time: "10:30 AM" },
    { author: "Charlie B.", content: "I think we're talking about effective study strategies for finals.", time: "10:31 AM" },
    { author: "Diana M.", content: "Perfect! I definitely need some tips. My first final is tomorrow.", time: "10:31 AM" },
    { author: "Fiona G.", content: "One thing that helps me is the Pomodoro Technique. 25 minutes of focused study, then a 5-minute break. It really helps maintain focus.", time: "10:33 AM", isCurrentUser: true },
    { author: "Hannah W.", content: "Oh, I've heard of that! Does it work for all subjects?", time: "10:34 AM" },
    { author: "Alice J.", content: "I use it for everything from coding to history. The key is to be disciplined during the focus time - no distractions!", time: "10:35 AM" },
];

export default function LiveDiscussionRoomPage({ params }: { params: { id: string } }) {
  const discussionTitle = params.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col p-4 md:p-6 bg-background">
      <header className="mb-6">
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
          <Radio className="h-10 w-10 text-primary animate-pulse" />
          Live: {discussionTitle}
        </h1>
        <p className="text-muted-foreground mt-2">
          Join the conversation and share your thoughts.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <div className="lg:col-span-3 flex flex-col">
          <Card className="h-full flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle>Chat Room</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${msg.isCurrentUser ? "justify-end" : ""}`}
                    >
                      {!msg.isCurrentUser && (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="https://placehold.co/100x100.png" alt={msg.author} data-ai-hint="avatar" />
                          <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`flex flex-col ${msg.isCurrentUser ? "items-end" : "items-start"}`}>
                          <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                              {!msg.isCurrentUser && <p className="text-xs font-semibold pb-1">{msg.author}</p>}
                              <p>{msg.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                      </div>
                      {msg.isCurrentUser && (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="https://placehold.co/100x100.png" alt={msg.author} data-ai-hint="user avatar" />
                          <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-background/50">
                <form className="flex items-center gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hidden lg:flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 p-4">
                {participants.map((p, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={p.avatar} alt={p.name} data-ai-hint="avatar" />
                      <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`font-medium ${p.isCurrentUser ? 'text-primary' : ''}`}>{p.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
