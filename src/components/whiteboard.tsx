
"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eraser, Pen, Highlighter, StickyNote, Square, Minus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };

type Path = {
  points: Point[];
  color: string;
  strokeWidth: number;
  tool: 'pen' | 'highlighter' | 'eraser';
};

type StickyNoteType = {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  isEditing?: boolean;
  isDragging?: boolean;
  dragOffset?: Point;
};

function getPoint(e: React.MouseEvent | React.TouchEvent) {
  const target = e.currentTarget as SVGSVGElement;
  const svg = target.getBoundingClientRect();
  if ('touches' in e.nativeEvent) {
    return { x: e.nativeEvent.touches[0].clientX - svg.left, y: e.nativeEvent.touches[0].clientY - svg.top };
  }
  return { x: e.nativeEvent.clientX - svg.left, y: e.nativeEvent.clientY - svg.top };
}

function SvgPath({ path }: { path: Path }) {
  const d = path.points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
    ""
  );
  return <path d={d} stroke={path.tool === 'eraser' ? 'hsl(var(--card))' : path.color} strokeWidth={path.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={path.tool === 'highlighter' ? 0.5 : 1} />;
}

const colors = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#F97316', '#FDE047'];

export function Whiteboard() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser' | 'sticky'>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [stickyNotes, setStickyNotes] = useState<StickyNoteType[]>([]);
  const whiteboardRef = useRef<HTMLDivElement>(null);

  const toolConfig = {
    pen: { strokeWidth: 3 },
    highlighter: { strokeWidth: 15 },
    eraser: { strokeWidth: 20 },
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (activeTool === 'sticky') return;

    setCurrentPath({ 
      points: [getPoint(e)], 
      color: currentColor, 
      strokeWidth: toolConfig[activeTool as keyof typeof toolConfig].strokeWidth, 
      tool: activeTool as 'pen' | 'highlighter' | 'eraser'
    });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool === 'sticky') return;
    if (!currentPath) return;
    e.preventDefault();
    setCurrentPath(prev => ({ ...(prev as Path), points: [...(prev?.points || []), getPoint(e)] }));
  };

  const handlePointerUp = () => {
    if (currentPath && currentPath.points.length > 1) {
      setPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath(null);
  };
  
  const handleClear = () => {
    setPaths([]);
    setStickyNotes([]);
    setCurrentPath(null);
  };

  const addStickyNote = () => {
    const newNote: StickyNoteType = {
      id: `sticky-${Date.now()}`,
      x: 100,
      y: 100,
      text: 'New Note',
      color: '#FFD700', // Gold color
    };
    setStickyNotes(prev => [...prev, newNote]);
  }

  const handleNoteDragStart = (id: string, e: React.MouseEvent) => {
    const noteIndex = stickyNotes.findIndex(n => n.id === id);
    if(noteIndex === -1) return;

    const note = stickyNotes[noteIndex];
    const dragOffset = {
        x: e.clientX - note.x,
        y: e.clientY - note.y,
    };

    const updatedNotes = stickyNotes.map(n => n.id === id ? { ...n, isDragging: true, dragOffset } : n);
    setStickyNotes(updatedNotes);
  };

  const handleNoteDrag = (e: React.MouseEvent) => {
    const draggingNote = stickyNotes.find(n => n.isDragging);
    if (!draggingNote || !draggingNote.dragOffset) return;

    const newX = e.clientX - draggingNote.dragOffset.x;
    const newY = e.clientY - draggingNote.dragOffset.y;

    const updatedNotes = stickyNotes.map(n => n.id === draggingNote.id ? { ...n, x: newX, y: newY } : n);
    setStickyNotes(updatedNotes);
  };
  
  const handleNoteDragEnd = () => {
      setStickyNotes(notes => notes.map(n => ({...n, isDragging: false, dragOffset: undefined})));
  };

  const handleNoteTextChange = (id: string, text: string) => {
    setStickyNotes(notes => notes.map(n => n.id === id ? {...n, text} : n));
  };
  
  const handleNoteDoubleClick = (id: string) => {
    setStickyNotes(notes => notes.map(n => n.id === id ? {...n, isEditing: true} : n));
  };
  
  const handleNoteBlur = (id: string) => {
      setStickyNotes(notes => notes.map(n => n.id === id ? {...n, isEditing: false} : n));
  };

  return (
    <Card className="h-full flex flex-col shadow-lg" onMouseMove={handleNoteDrag} onMouseUp={handleNoteDragEnd}>
        <CardContent className="p-0 flex-1 relative" ref={whiteboardRef}>
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
            {stickyNotes.map(note => (
                <div 
                    key={note.id}
                    className="absolute p-2 shadow-lg"
                    style={{ left: note.x, top: note.y, backgroundColor: note.color, cursor: note.isDragging ? 'grabbing' : 'grab' }}
                    onMouseDown={(e) => handleNoteDragStart(note.id, e)}
                    onDoubleClick={() => handleNoteDoubleClick(note.id)}
                >
                    {note.isEditing ? (
                        <textarea
                            value={note.text}
                            onChange={e => handleNoteTextChange(note.id, e.target.value)}
                            onBlur={() => handleNoteBlur(note.id)}
                            className="bg-transparent border-0 focus:ring-0 resize-none outline-none w-32 h-24"
                            autoFocus
                        />
                    ) : (
                        <p className="w-32 h-24 break-words whitespace-pre-wrap">{note.text}</p>
                    )}
                </div>
            ))}
        </CardContent>
        <CardFooter className="p-2 border-t flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Button variant={activeTool === 'pen' ? 'default' : 'outline'} size="icon" onClick={() => setActiveTool('pen')}>
                    <Pen className="h-4 w-4" />
                </Button>
                <Button variant={activeTool === 'highlighter' ? 'default' : 'outline'} size="icon" onClick={() => setActiveTool('highlighter')}>
                    <Highlighter className="h-4 w-4" />
                </Button>
                <Button variant={activeTool === 'sticky' ? 'default' : 'outline'} size="icon" onClick={addStickyNote}>
                    <StickyNote className="h-4 w-4" />
                </Button>
            </div>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <div className="w-5 h-5 rounded-full border" style={{backgroundColor: currentColor}} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                    <div className="flex gap-1">
                        {colors.map(color => (
                            <button
                                key={color}
                                onClick={() => setCurrentColor(color)}
                                className={cn("w-7 h-7 rounded-full border-2", currentColor === color ? 'border-primary' : 'border-transparent')}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
                <Button variant={activeTool === 'eraser' ? 'default' : 'outline'} size="icon" onClick={() => setActiveTool('eraser')}>
                    <Eraser className="h-4 w-4" />
                </Button>
                <Button variant="destructive" onClick={handleClear}>
                    Clear All
                </Button>
            </div>
        </CardFooter>
    </Card>
  );
}

    
