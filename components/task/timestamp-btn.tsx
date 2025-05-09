"use client";
import { Pause, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/app/context/store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { createTimeLog } from "@/app/dal/timerAction";

interface TimestampBtnProps {
  taskId: string;
  className?: string;
}

export default function TimestampBtn({ taskId, className }: TimestampBtnProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { toggleTimer, activeTimers, getTimeStamps } = useTimerStore();
  const isActive = activeTimers[taskId] || false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Toggle the timer (this will update start/end times in the store)
    toggleTimer(taskId);

    // After toggling, log the appropriate message
    if (isActive) {
      // We just paused the timer
      const newTimestamps = getTimeStamps(taskId);
      const duration =
        newTimestamps.endTime && newTimestamps.startTime
          ? (newTimestamps.endTime - newTimestamps.startTime) / 1000
          : 0;

      // console.log("Timer Paused", {
      //   taskId,
      //   startTime: new Date(newTimestamps.startTime || 0).toLocaleString(),
      //   endTime: new Date(newTimestamps.endTime || 0).toLocaleString(),
      //   durationSeconds: duration,
      //   formattedDuration: formatDuration(duration * 1000),
      // });
      const config = {
        taskId,
        startTime: new Date(newTimestamps.startTime || 0).toLocaleString(),
        endTime: new Date(newTimestamps.endTime || 0).toLocaleString(),
        duration: duration.toString(),
      };
      // make the api call here
      const result = await createTimeLog(config);
      if (!result.success) {
        alert(result?.message ?? "Failed");
        return;
      }
      alert("Time logged");
    } else {
      // We just started the timer
      const newTimestamps = getTimeStamps(taskId);
      console.log("Timer Started", {
        taskId,
        startTime: new Date(newTimestamps.startTime || 0).toLocaleString(),
      });
    }
  };

  // const formatDuration = (ms: number) => {
  //   const totalSeconds = Math.floor(ms / 1000);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;

  //   return [
  //     hours.toString().padStart(2, "0"),
  //     minutes.toString().padStart(2, "0"),
  //     seconds.toString().padStart(2, "0"),
  //   ].join(":");
  // };

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
      onClick={handleClick}
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
