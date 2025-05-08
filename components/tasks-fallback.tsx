import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function TasksFallback() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Card
          key={idx}
          className="flex flex-col justify-between transition-shadow border-muted hover:shadow-md p-4"
        >
          {/* Header */}
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-5" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardHeader>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4">
            <div className="space-y-2 w-full sm:w-auto">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-full sm:w-32 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
