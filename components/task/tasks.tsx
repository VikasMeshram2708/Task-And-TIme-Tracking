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
import TimestampBtn from "./timestamp-btn";
import TaskCountdown from "./task-countdown";
// import ElapsedTime from "./elapsed-time";

type TasksProps = {
  tasks: Task[];
};

export default function Tasks({ tasks }: TasksProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <Card
          key={task?.id}
          className="flex flex-col justify-between border hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base font-medium leading-snug line-clamp-2 w-4/5">
                {task?.title || "Untitled Task"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <TimestampBtn taskId={task.id} />
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 rounded-md hover:bg-accent focus:outline-none focus-visible:ring">
                    <EllipsisVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <EditTask task={task} />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteTask
                        taskId={task?.id}
                        defaultTitle={task?.title}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardDescription className="mt-2 text-sm leading-relaxed line-clamp-3">
              {task?.description || "No description provided for this task."}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4 text-sm">
            <div className="space-y-1 text-muted-foreground">
              {task?.createdAt ? (
                <>
                  {/* <span>Elapsed Time : </span> */}
                  <TaskCountdown />
                  {/* <ElapsedTime taskId={task?.id} /> */}
                </>
              ) : (
                <p>Creation date unavailable</p>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <Suspense
                fallback={
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Processing...
                  </div>
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
