
"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eraser, Pen, Highlighter, StickyNote } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
// Note: Firebase integration will be added in subsequent steps.

type Point = { x: number; y: number };

type Path = {
  id: string;
  points: Point[];
  color: string;
  strokeWidth: number;
  tool: 'pen' | 'highlighter';
};

type EraserPath = {
    id: string;
    points: Point[];
    strokeWidth: number;
    tool: 'eraser';
}

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

// Represents the entire state of the whiteboard
type WhiteboardState = {
    paths: Record<string, Path>;
    eraserPaths: Record<string, EraserPath>;
    stickyNotes: Record<string, StickyNoteType>;
}

function getPoint(e: React.MouseEvent | React.TouchEvent, svg: SVGSVGElement): Point {
  const rect = svg.getBoundingClientRect();
  if ('touches' in e.nativeEvent) {
    return { x: e.nativeEvent.touches[0].clientX - rect.left, y: e.nativeEvent.touches[0].clientY - rect.top };
  }
  return { x: e.nativeEvent.clientX - rect.left, y: e.nativeEvent.clientY - rect.top };
}

function SvgPath({ path }: { path: Path | EraserPath }) {
  const d = path.points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
    ""
  );
  
  if (path.tool === 'eraser') {
    return <path d={d} stroke={'hsl(var(--card))'} strokeWidth={path.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  }

  return <path d={d} stroke={path.color} strokeWidth={path.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={path.tool === 'highlighter' ? 0.5 : 1} />;
}

const colors = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#F97316', '#FDE047'];

export function Whiteboard() {
  const [whiteboardState, setWhiteboardState] = useState<WhiteboardState>({ paths: {}, eraserPaths: {}, stickyNotes: {} });
  const [currentDrawing, setCurrentDrawing] = useState<Path | EraserPath | null>(null);
  
  const [activeTool, setActiveTool] = useState<'pen' | 'highlighter' | 'eraser' | 'sticky'>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const svgRef = useRef<SVGSVGElement>(null);
  const isDrawing = useRef(false);

  const toolConfig = {
    pen: { strokeWidth: 3 },
    highlighter: { strokeWidth: 15 },
    eraser: { strokeWidth: 20 },
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (activeTool === 'sticky' || e.target !== svgRef.current) return;
    
    isDrawing.current = true;
    const svg = svgRef.current;
    if (!svg) return;

    const newPath = {
        id: `path-${Date.now()}`,
        points: [getPoint(e, svg)],
        strokeWidth: toolConfig[activeTool].strokeWidth,
        tool: activeTool,
        ...(activeTool !== 'eraser' && { color: currentColor }),
    } as Path | EraserPath;

    setCurrentDrawing(newPath);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !currentDrawing) return;
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;

    setCurrentDrawing(prev => {
        if (!prev) return null;
        return { ...prev, points: [...prev.points, getPoint(e, svg)] };
    });
  };

  const handlePointerUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (currentDrawing && currentDrawing.points.length > 1) {
        setWhiteboardState(prevState => {
            const newState = {...prevState};
            if(currentDrawing.tool === 'eraser') {
                newState.eraserPaths[currentDrawing.id] = currentDrawing as EraserPath;
            } else {
                newState.paths[currentDrawing.id] = currentDrawing as Path;
            }
            return newState;
        });
    }
    setCurrentDrawing(null);
  };
  
  const handleClear = () => {
    setWhiteboardState({ paths: {}, eraserPaths: {}, stickyNotes: {} });
    setCurrentDrawing(null);
  };

  const addStickyNote = () => {
    const id = `sticky-${Date.now()}`;
    const newNote: StickyNoteType = {
      id: id,
      x: 100,
      y: 100,
      text: 'New Note',
      color: '#FDE047',
    };
    setWhiteboardState(prev => ({...prev, stickyNotes: {...prev.stickyNotes, [id]: newNote}}));
  }

  const handleNoteDragStart = (id: string, e: React.MouseEvent) => {
    const note = whiteboardState.stickyNotes[id];
    if(!note) return;

    const dragOffset = {
        x: e.clientX - note.x,
        y: e.clientY - note.y,
    };
    
    setWhiteboardState(prev => ({
        ...prev,
        stickyNotes: {...prev.stickyNotes, [id]: {...note, isDragging: true, dragOffset }}
    }));
  };

  const handleNoteDrag = (e: React.MouseEvent) => {
    const draggingNoteEntry = Object.entries(whiteboardState.stickyNotes).find(([, note]) => note.isDragging);
    if (!draggingNoteEntry) return;

    e.stopPropagation();

    const [id, draggingNote] = draggingNoteEntry;
    if (!draggingNote.dragOffset) return;

    const newX = e.clientX - draggingNote.dragOffset.x;
    const newY = e.clientY - draggingNote.dragOffset.y;

    const updatedNote = { ...draggingNote, x: newX, y: newY };
    setWhiteboardState(prev => ({...prev, stickyNotes: {...prev.stickyNotes, [id]: updatedNote}}));
  };
  
  const handleNoteDragEnd = () => {
      setWhiteboardState(prev => {
          const updatedNotes: Record<string, StickyNoteType> = {};
          for (const id in prev.stickyNotes) {
              updatedNotes[id] = {...prev.stickyNotes[id], isDragging: false, dragOffset: undefined};
          }
          return {...prev, stickyNotes: updatedNotes};
      });
  };

  const handleNoteTextChange = (id: string, text: string) => {
    const note = whiteboardState.stickyNotes[id];
    if (!note) return;
    setWhiteboardState(prev => ({...prev, stickyNotes: {...prev.stickyNotes, [id]: {...note, text}}}));
  };
  
  const handleNoteDoubleClick = (id: string) => {
    const note = whiteboardState.stickyNotes[id];
    if (!note) return;
    setWhiteboardState(prev => ({...prev, stickyNotes: {...prev.stickyNotes, [id]: {...note, isEditing: true}}}));
  };
  
  const handleNoteBlur = (id: string) => {
      const note = whiteboardState.stickyNotes[id];
      if (!note) return;
      setWhiteboardState(prev => ({...prev, stickyNotes: {...prev.stickyNotes, [id]: {...note, isEditing: false}}}));
  };

  return (
    <Card className="h-full flex flex-col shadow-lg" onMouseMove={handleNoteDrag} onMouseUp={handleNoteDragEnd} onMouseLeave={handleNoteDragEnd}>
        <CardContent className="p-0 flex-1 relative">
            <svg
                ref={svgRef}
                className="w-full h-full touch-none bg-card rounded-t-lg"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
            >
                {Object.values(whiteboardState.paths).map((path) => <SvgPath key={path.id} path={path} />)}
                {Object.values(whiteboardState.eraserPaths).map((path) => <SvgPath key={path.id} path={path} />)}
                {currentDrawing && <SvgPath path={currentDrawing} />}
            </svg>
            {Object.values(whiteboardState.stickyNotes).map(note => (
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
