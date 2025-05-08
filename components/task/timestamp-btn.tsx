"use client";
import { Pause, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/app/context/store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimestampBtnProps {
  taskId: string;
  className?: string;
}

export default function TimestampBtn({ taskId, className }: TimestampBtnProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { toggleTimer, activeTimers } = useTimerStore();
  const isActive = activeTimers[taskId] || false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full bg-muted", className)}
        disabled
      />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.stopPropagation();
        toggleTimer(taskId);
      }}
      aria-label={isActive ? "Pause timer" : "Start timer"}
      className={cn(
        "rounded-full",
        isActive
          ? "bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white"
          : "bg-muted hover:bg-muted/80",
        className
      )}
    >
      {isActive ? (
        <Pause className="h-5 w-5" />
      ) : (
        <PlayCircle className="h-5 w-5" />
      )}
    </Button>
  );
}
