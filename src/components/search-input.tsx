import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  containerClassName?: string;
}

export function SearchInput({ className, containerClassName, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className={cn("pl-9", className)} {...props} />
    </div>
  );
}
