import * as z from "zod";

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
