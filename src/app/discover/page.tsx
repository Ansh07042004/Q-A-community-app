
import { spaces } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Shapes } from "lucide-react";
import Image from "next/image";

export default function DiscoverSpacesPage() {
  return (
    <div className="py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <Shapes className="mx-auto h-16 w-16 text-primary" />
          <h1 className="font-headline text-5xl font-bold mt-4">Discover Spaces</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore communities centered around your favorite subjects. Join a space to learn, share, and connect.
          </p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {spaces.map((space) => (
            <Card key={space.id} className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                    <Image 
                        src={space.imageUrl} 
                        alt={space.name} 
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={space.imageHint}
                    />
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <CardTitle className="font-headline text-2xl">{space.name}</CardTitle>
                <CardDescription className="mt-2 text-base">{space.memberCount.toLocaleString()} members</CardDescription>
                <CardDescription className="mt-2 line-clamp-3">{space.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Join Space
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
