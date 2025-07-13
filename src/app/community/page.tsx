import { UserSearch } from "lucide-react";
import { students } from "@/lib/mock-data";
import { StudentCard } from "@/components/student-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
      <header className="mb-12 text-center">
        <UserSearch className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">Meet the Community</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Connect with fellow students, find study partners, and see who's online.
        </p>
      </header>
      
      <div className="mb-8 p-4 bg-card border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Search by name..." className="h-11" />
              <Select>
                  <SelectTrigger className="h-11">
                      <SelectValue placeholder="Filter by major" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
              </Select>
              <Select>
                  <SelectTrigger className="h-11">
                      <SelectValue placeholder="Filter by online status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
              </Select>
          </div>
      </div>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </main>
    </div>
  );
}
