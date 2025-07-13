import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, UserPlus, MessageSquare, ThumbsUp } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "new_answer",
    icon: MessageSquare,
    text: "Niels B. answered your question about quantum mechanics.",
    timestamp: "15 minutes ago",
    authorAvatar: "https://placehold.co/100x100.png",
  },
  {
    id: 2,
    type: "upvote",
    icon: ThumbsUp,
    text: "Marie C. upvoted your answer on photosynthesis.",
    timestamp: "1 hour ago",
    authorAvatar: "https://placehold.co/100x100.png",
  },
  {
    id: 3,
    type: "new_follower",
    icon: UserPlus,
    text: "Albert E. is now following you.",
    timestamp: "3 hours ago",
    authorAvatar: "https://placehold.co/100x100.png",
  },
  {
    id: 4,
    type: "new_answer",
    icon: MessageSquare,
    text: "Mary B. answered your question about the Roman Empire.",
    timestamp: "1 day ago",
    authorAvatar: "https://placehold.co/100x100.png",
  },
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
          <Bell className="h-10 w-10 text-primary" />
          Notifications
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what you've missed.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardContent className="p-0">
            <div className="divide-y">
            {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <notification.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="text-foreground">{notification.text}</p>
                        <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                    </div>
                     <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.authorAvatar} alt="author" data-ai-hint="avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
            ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
