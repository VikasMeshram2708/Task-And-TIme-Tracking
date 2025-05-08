"use client";

import { useTimerStore } from "@/app/context/store";
import React, { useEffect, useState } from "react";

interface ElapsedTimeProps {
  taskId: string;
}

export default function ElapsedTime({ taskId }: ElapsedTimeProps) {
  const getElapsedTime = useTimerStore((state) => state.getElapsedTime);
  const [seconds, setSeconds] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSeconds(getElapsedTime(taskId)); // set initial value on mount

    const interval = setInterval(() => {
      setSeconds(getElapsedTime(taskId));
    }, 1000);

    return () => clearInterval(interval);
  }, [getElapsedTime, taskId]);

  const formatRelativeTime = (sec: number): string => {
    if (sec < 60) return `${sec} second${sec === 1 ? "" : "s"}`;
    const minutes = Math.floor(sec / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours === 1 ? "" : "s"}${
      remainingMinutes > 0 ? `, ${remainingMinutes} min` : ""
    }`;
  };

  // Prevent hydration mismatch by rendering nothing until client is mounted
  if (!mounted) return null;

  return (
    <div className="text-xl font-medium text-primary" suppressHydrationWarning>
      {formatRelativeTime(seconds)}
    </div>
  );
}
