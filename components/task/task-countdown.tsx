"use client";
import { useTimerStore } from "@/app/context/store";
import { Clock, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import { formatTime } from "@/lib/formatTime";
import { Button } from "../ui/button";

export default function TaskCountdown() {
  const [mounted, setMounted] = useState(false);
  const { activeTimers, stopTimer, getElapsedTime } = useTimerStore();

  // Get first active timer
  const activeTaskId = Object.keys(activeTimers).find((id) => activeTimers[id]);
  const elapsedTime = activeTaskId ? getElapsedTime(activeTaskId) : 0;

  // Hydration handling
  useEffect(() => setMounted(true), []);

  // Update every second if active
  useEffect(() => {
    if (!activeTaskId) return;
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, [activeTaskId]);

  if (!mounted || !activeTaskId) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in">
        <div className="bg-background border rounded-lg shadow-lg p-4 w-64 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Active Timer</span>
            </div>
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
              {formatTime(elapsedTime)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Task ID:</span>
            <span className="font-medium truncate">
              {activeTaskId.slice(0, 8)}...
            </span>
          </div>

          <Button
            variant="destructive"
            size="sm"
            className="w-full mt-2"
            onClick={() => stopTimer(activeTaskId)}
          >
            <Pause className="h-4 w-4 mr-2" />
            Stop Timer
          </Button>
        </div>
      </div>
    </>
  );
}
