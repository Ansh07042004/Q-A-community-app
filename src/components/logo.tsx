import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline text-primary", className)}>
      <GraduationCap className="h-7 w-7" />
      <span>CampusConnect</span>
    </Link>
  );
}
