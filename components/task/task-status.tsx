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
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { useTimerStore } from "@/app/context/store";
import { createTimeLog } from "@/app/dal/timerAction";

type StatusType = "INPROGRESS" | "PENDING" | "COMPLETED";

type TaskStatusProps = {
  status: StatusType;
  taskId: string;
};

export default function TaskStatus({ status, taskId }: TaskStatusProps) {
  const [statusValue, setStatusValue] = useState<StatusType>(status);
  const debouncedStatus = useDebounce(statusValue, 500);
  const [loading, setLoading] = useState(false);

  const { startTimer, stopTimer, getTimeStamps, activeTimers } =
    useTimerStore();

  function handleChange(value: StatusType) {
    setStatusValue(value);
  }

  useEffect(() => {
    async function updateTaskStatus() {
      if (debouncedStatus !== status) {
        try {
          setLoading(true);
          const result = await updateStatus({
            status: debouncedStatus,
            taskId,
          });

          if (!result.success) {
            alert(result.message ?? "Failed");
            return;
            // throw new Error(result.message || "Failed to update status");
          }
          alert("Status Updated");
          return;

          // console.log("Status updated successfully");
        } catch (error) {
          console.error("Status update error:", error);
          setStatusValue(status);
          alert((error as Error).message || "Failed to update status");
        } finally {
          setLoading(false);
        }
      }
    }

    updateTaskStatus();
  }, [debouncedStatus, status, taskId]);

  // Handle timer state based on status changes
  // useEffect(() => {
  //   // If status is changing to COMPLETED and timer was running
  //   if (debouncedStatus === "COMPLETED" && activeTimers[taskId]) {
  //     const handleCompletion = async () => {
  //       stopTimer(taskId);
  //       const { startTime, endTime } = getTimeStamps(taskId);
  //       const estimatedDuration =
  //         startTime && endTime ? Math.floor((endTime - startTime) / 1000) : 0;
  //       try {
  //         const result = await createTimeLog({
  //           taskId,
  //           startTime: startTime ? new Date(startTime).toISOString() : null,
  //           endTime: endTime ? new Date(endTime).toISOString() : null,
  //           duration: estimatedDuration.toString(),
  //         });

  //         if (!result.success) {
  //           console.error("Failed to save time log");
  //         } else {
  //           console.log("Time log saved for completed task", {
  //             taskId,
  //             startTime,
  //             endTime,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error saving time log:", error);
  //       }
  //     };
  //     handleCompletion();
  //   }

  //   // For all other status changes, maintain timer state
  //   if (debouncedStatus !== status) {
  //     if (debouncedStatus === "INPROGRESS") {
  //       startTimer(taskId);
  //     } else if (status === "INPROGRESS" && debouncedStatus !== "COMPLETED") {
  //       // Only stop timer if changing from INPROGRESS to non-COMPLETED status
  //       stopTimer(taskId);
  //     }
  //   }
  // }, [
  //   debouncedStatus,
  //   status,
  //   taskId,
  //   activeTimers,
  //   getTimeStamps,
  //   startTimer,
  //   stopTimer,
  // ]);

  return (
    <div>
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

      <Dialog open={loading}>
        <DialogContent>
          <DialogTitle className="flex items-center gap-4">
            <Loader2 className="animate-spin w-5 h-5" />
            Updating Status...
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
