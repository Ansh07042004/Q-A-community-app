import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <BookOpen className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in to your CampusConnect account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@college.edu" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/register">
                Sign up
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
