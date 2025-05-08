import { Task } from "@/types";
import React, { Suspense } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical, Loader2 } from "lucide-react";
import DeleteTask from "./delete-task";
import EditTask from "./edit-task";
import TaskStatus from "./task-status";

type TasksProps = {
  tasks: Task[];
};

export default function Tasks({ tasks }: TasksProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card
          key={task?.id}
          className="flex flex-col justify-between transition-shadow border-muted hover:shadow-md"
        >
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold truncate w-[80%]">
                {task?.title || "Untitled Task"}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <EditTask task={task} />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteTask taskId={task?.id} defaultTitle={task?.title} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="text-sm text-muted-foreground line-clamp-3">
              {task?.description || "No description provided for this task."}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4 text-sm">
            <div className="space-y-1 text-muted-foreground">
              {task?.createdAt ? (
                <>
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(task.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {new Date(task.createdAt).toLocaleTimeString("en-IN", {
                      hour12: true,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              ) : (
                <p>Creation date unavailable</p>
              )}
            </div>

            <div className="w-full sm:w-auto">
              <Suspense
                fallback={
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    "Processing..."
                  </>
                }
              >
                {task?.status && (
                  <TaskStatus status={task?.status} taskId={task?.id} />
                )}
              </Suspense>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
