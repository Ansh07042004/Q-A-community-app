"use client";

import { useWhiteboard } from "react-use-whiteboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eraser, Pencil } from "lucide-react";

export function VirtualWhiteboard() {
  const { canvas, clear, changeColor } = useWhiteboard();

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Whiteboard</CardTitle>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="icon" onClick={() => changeColor("#000000")} title="Draw">
             <Pencil className="h-5 w-5" />
           </Button>
           <Button variant="outline" size="icon" onClick={() => changeColor("#ffffff")} title="Erase">
             <Eraser className="h-5 w-5" />
           </Button>
           <Button onClick={clear} variant="destructive">Clear Board</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="w-full h-full border-t bg-white rounded-b-lg overflow-hidden">
            {canvas}
        </div>
      </CardContent>
    </Card>
  );
}
