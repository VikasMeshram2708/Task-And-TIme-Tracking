export interface Task {
  id: string;
  title: string;
  description: string;
  status: "INPROGRESS" | "COMPLETED" | "PENDING" | null;
  tenantId: string;
  completedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type Status = "INPROGRESS" | "PENDING" | "COMPLETED";

export interface TrackLog {
  id: string;
  taskId: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}
