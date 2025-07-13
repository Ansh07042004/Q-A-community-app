import type { Student } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StudentCard({ student }: { student: Student }) {
  return (
    <Card className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10">
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
      <CardContent className="text-sm text-muted-foreground">
        <p>{student.major}</p>
        <p>Year {student.year}</p>
      </CardContent>
    </Card>
  );
}
