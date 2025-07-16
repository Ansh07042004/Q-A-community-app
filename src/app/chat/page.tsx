
import { Bot } from "lucide-react";
import { Chat } from "@/components/chat";

export default function ChatPage() {
  return (
    <div className="py-12 px-4 md:px-6 h-full flex flex-col">
       <header className="mb-8 text-center">
        <Bot className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">AI Assistant</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Have a question? Ask our AI assistant, CampusBot, for a quick and accurate answer.
        </p>
      </header>
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-3xl h-full">
            <Chat />
        </div>
      </main>
    </div>
  );
}
