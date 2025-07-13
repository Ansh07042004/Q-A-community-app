import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PenSquare } from "lucide-react";

export default function AskQuestionPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <PenSquare className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">Ask a Public Question</CardTitle>
              <CardDescription>Share your query with the community to get help.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">Question Title</Label>
              <p className="text-sm text-muted-foreground">Be specific and imagine you’re asking a question to another person.</p>
              <Input id="title" placeholder="e.g. How to implement a binary search tree in Python?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-lg font-semibold">Topic</Label>
              <p className="text-sm text-muted-foreground">Choose a topic that best fits your question.</p>
              <Select>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="text-lg font-semibold">Detailed Description</Label>
              <p className="text-sm text-muted-foreground">Include all the information someone would need to answer your question.</p>
              <Textarea id="body" rows={10} placeholder="Provide details about what you've tried, what you're expecting, and any error messages." />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg">Post Your Question</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
