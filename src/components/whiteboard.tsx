
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eraser } from 'lucide-react';

type Path = {
  points: { x: number; y: number }[];
};

function getPoint(e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) {
  let x: number, y: number;
  if ('touches' in e.nativeEvent) {
    x = e.nativeEvent.touches[0].clientX;
    y = e.nativeEvent.touches[0].clientY;
  } else {
    x = e.nativeEvent.clientX;
    y = e.nativeEvent.clientY;
  }
  const svg = e.currentTarget.getBoundingClientRect();
  return { x: x - svg.left, y: y - svg.top };
}

function SvgPath({ path }: { path: Path }) {
  const d = path.points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
    ""
  );
  return <path d={d} stroke="hsl(var(--foreground))" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
}

export function Whiteboard() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  const handlePointerDown = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    e.preventDefault();
    setCurrentPath({ points: [getPoint(e)] });
  };

  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!currentPath) return;
    e.preventDefault();
    setCurrentPath(prev => ({ points: [...(prev?.points || []), getPoint(e)] }));
  };

  const handlePointerUp = () => {
    if (currentPath && currentPath.points.length > 1) {
      setPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath(null);
  };
  
  const handleClear = () => {
    setPaths([]);
    setCurrentPath(null);
  }

  return (
    <Card className="h-full flex flex-col shadow-lg">
        <CardContent className="p-0 flex-1 relative">
            <svg
                className="w-full h-full touch-none bg-card rounded-t-lg"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
            >
                {paths.map((path, i) => <SvgPath key={i} path={path} />)}
                {currentPath && <SvgPath path={currentPath} />}
            </svg>
        </CardContent>
        <CardFooter className="p-2 border-t justify-end">
            <Button variant="outline" onClick={handleClear}>
                <Eraser className="mr-2 h-4 w-4" />
                Clear
            </Button>
        </CardFooter>
    </Card>
  );
}
