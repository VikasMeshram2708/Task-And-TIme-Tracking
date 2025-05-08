import * as z from "zod";

// Create Schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be within 200 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be within 500 characters" }),
  status: z.enum(["INPROGRESS", "PENDING", "COMPLETED"]),
});

export type TaskSchema = z.infer<typeof taskSchema>;

// Delete schema
export const deleteTaskSchema = z.object({
  taskId: z.string().min(1, { message: "Task Id is require" }),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be within 200 characters" }),
});
export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>;

// Edit schema
export const editTaskSchema = z.object({
  taskId: z.string().min(1, { message: "Task Id is required" }),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be within 200 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be within 500 characters" }),
  status: z.enum(["INPROGRESS", "PENDING", "COMPLETED"]),
});

export type EditTaskSchema = z.infer<typeof editTaskSchema>;

// Update Status Schema
export const updateTaskSchema = z.object({
  status: z.enum(["INPROGRESS", "PENDING", "COMPLETED"]),
  taskId: z.string().min(1, { message: "Task Id is required" }),
});
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
