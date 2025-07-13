
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/mock-data";
import { UserCog } from "lucide-react";

export default function ProfileSettingsPage() {
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
            <CardDescription>Update your name and academic details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
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
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
