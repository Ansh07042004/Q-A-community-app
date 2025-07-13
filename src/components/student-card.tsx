"use client";

import type { Student } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export function StudentCard({ student }: { student: Student }) {
  const [isMicOn, setIsMicOn] = React.useState(false);
  const { toast } = useToast();

  const handleToggleMic = async () => {
    if (isMicOn) {
      setIsMicOn(false);
      // In a real app, you would stop the stream here.
    } else {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsMicOn(true);
        toast({
            title: "Microphone Enabled",
            description: `You can now talk to ${student.name}.`,
        });
      } catch (err) {
        console.error("Microphone access denied:", err);
        toast({
            variant: "destructive",
            title: "Microphone Access Denied",
            description: "Please enable microphone permissions in your browser settings.",
        });
      }
    }
  };

  return (
    <Card className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10 flex flex-col">
      <CardHeader className="relative pt-12">
        <Avatar className="h-20 w-20 mx-auto border-4 border-background shadow-lg absolute -top-10 left-1/2 -translate-x-1/2">
          <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="avatar" />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="relative">
          <h3 className="font-headline text-lg font-semibold">{student.name}</h3>
          {student.isOnline && (
            <div className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex-grow">
        <p>{student.major}</p>
        <p>Year {student.year}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handleToggleMic} variant={isMicOn ? "default" : "outline"} className="w-full">
            {isMicOn ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
            {isMicOn ? "Mic On" : "Talk"}
        </Button>
      </CardFooter>
    </Card>
  );
}
