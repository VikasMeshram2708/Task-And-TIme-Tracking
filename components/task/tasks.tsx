import { Task } from "@/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteTask from "./delete-task";

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
              <CardTitle className="text-lg font-semibold truncate">
                {task?.title || "Untitled Task"}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
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
              <Select defaultValue={task?.status ?? "INPROGRESS"}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INPROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  );
}
