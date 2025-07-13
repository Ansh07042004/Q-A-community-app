
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { currentUser } from "@/lib/mock-data";
import { UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettingsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSaveChanges = () => {
    // In a real application, you would handle the form submission logic here.
    toast({
      title: "Success!",
      description: "Your profile information has been updated.",
    });
    router.push("/profile");
  };

  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold flex items-center gap-3">
            <UserCog className="h-10 w-10 text-primary" />
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account details and preferences.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your name, photo, and academic details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} data-ai-hint="avatar" />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <Label>Profile Photo</Label>
                    <div className="flex gap-2">
                        <Button variant="outline">Change Photo</Button>
                        <Input id="picture" type="file" className="hidden" />
                    </div>
                    <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" defaultValue={currentUser.major} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" defaultValue={currentUser.year} />
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Separator className="my-8" />

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>For your security, we recommend using a strong, unique password.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </form>
            </CardContent>
        </Card>

        <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
