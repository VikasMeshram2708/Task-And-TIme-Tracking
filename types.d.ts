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
