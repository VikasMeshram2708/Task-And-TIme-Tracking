"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useDebounce from "@/lib/useDebounce";
import { updateStatus } from "@/app/dal/actions";

type StatusType = "INPROGRESS" | "PENDING" | "COMPLETED";

type TaskStatusProps = {
  status: StatusType;
  taskId: string;
};

export default function TaskStatus({ status, taskId }: TaskStatusProps) {
  const [statusValue, setStatusValue] = useState<StatusType>(status);
  const debouncedStatus = useDebounce(statusValue, 500); // Added delay parameter

  function handleChange(value: StatusType) {
    setStatusValue(value);
  }

  useEffect(() => {
    async function updateTaskStatus() {
      if (debouncedStatus !== status) {
        // Only update if status changed
        try {
          const result = await updateStatus({
            status: debouncedStatus,
            taskId,
          });

          if (!result.success) {
            throw new Error(result.message || "Failed to update status");
          }
          // Optional: show toast instead of alert
          console.log("Status updated successfully");
          alert("Updated");
          return;
        } catch (error) {
          console.error("Status update error:", error);
          // Revert to previous status if update fails
          setStatusValue(status);
          alert((error as Error).message || "Failed to update status");
          return;
        }
      }
    }

    updateTaskStatus();
  }, [debouncedStatus, status, taskId]);

  return (
    <Select onValueChange={handleChange} defaultValue={status}>
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="INPROGRESS">In Progress</SelectItem>
        <SelectItem value="COMPLETED">Completed</SelectItem>
        <SelectItem value="PENDING">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
}
