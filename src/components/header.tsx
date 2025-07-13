"use client";

import Link from "next/link";
import { useState } from "react";
import { BookMarked, Menu, PenSquare, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Browse Topics", href: "/topics", icon: BookMarked },
  { name: "Ask Question", href: "/ask", icon: PenSquare },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-xs">
           <div className="relative w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input placeholder="Search..." className="pl-9" />
           </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <Logo />
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-md p-2 text-lg font-medium hover:bg-muted">
                      <item.icon className="h-5 w-5 text-primary" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-9" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
