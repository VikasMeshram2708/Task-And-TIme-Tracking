"use server";

import { db } from "@/db";
import { taskTable } from "@/db/schema/schema";
import {
  deleteTaskSchema,
  editTaskSchema,
  taskSchema,
  updateTaskSchema,
} from "@/model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import assert from "node:assert";

// Create Task
export const createTask = async (data: unknown) => {
  //   auth check
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const isAuthorized = (await getPermission("crud:task"))?.isGranted;

  if (!authenticated) {
    throw new Error("Un-Authorized");
  }

  const user = await getUser();

  assert(authenticated, "Un-Authorized");

  // parse the incoming data
  const parsed = taskSchema.safeParse(data);
  if (!parsed.success) {
    return {
      formError: parsed?.error.flatten().fieldErrors,
      success: false,
      message: "Parsing Error",
    };
  }

  const { description, status, title } = parsed.data;

  if (!isAuthorized) {
    throw new Error("Un-Authorized");
  }

  try {
    assert(user, "User not found");
    assert(isAuthorized, "Un-Authorized");
    //   start the transaction
    await db.transaction(async (tsx) => {
      // store the task details
      await tsx
        .insert(taskTable)
        .values({
          title,
          description,
          status,
          tenantId: user?.id,
        })
        .returning();
    });
  } catch (e) {
    console.error(e);
    throw new Error(
      (e as Error).message ??
        "Something went wrong. Task Creation failed try again."
    );
  }

  //   revalidate
  revalidatePath("/dashboard/task");

  return {
    success: true,
    message: "Task Created",
  };
};

// Delete Task
export const deleteTask = async (data: unknown) => {
  //   auth check
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const isAuthorized = (await getPermission("crud:task"))?.isGranted;

  if (!authenticated) {
    throw new Error("Un-Authorized");
  }

  const user = await getUser();

  assert(authenticated, "Un-Authorized");

  // parse the incoming data
  const parsed = deleteTaskSchema.safeParse(data);
  if (!parsed.success) {
    return {
      formError: parsed?.error.flatten().fieldErrors,
      success: false,
      message: "Parsing Error",
    };
  }

  const { taskId } = parsed.data;

  if (!isAuthorized) {
    throw new Error("Un-Authorized");
  }

  try {
    assert(user, "User not found");
    assert(isAuthorized, "Un-Authorized");
    //   start the transaction
    await db.transaction(async (tsx) => {
      // store the task details
      await tsx.delete(taskTable).where(eq(taskTable.id, taskId));
    });
  } catch (e) {
    console.error(e);
    throw new Error(
      (e as Error).message ??
        "Something went wrong. Task Deletion failed try again."
    );
  }

  //   revalidate
  revalidatePath("/dashboard/task");

  return {
    success: true,
    message: "Task Deleted",
  };
};

// Edit Task
export const editTask = async (data: unknown) => {
  //   auth check
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const isAuthorized = (await getPermission("crud:task"))?.isGranted;

  if (!authenticated) {
    throw new Error("Un-Authorized");
  }

  const user = await getUser();

  assert(authenticated, "Un-Authorized");

  // parse the incoming data
  const parsed = editTaskSchema.safeParse(data);
  if (!parsed.success) {
    return {
      formError: parsed?.error.flatten().fieldErrors,
      success: false,
      message: "Parsing Error",
    };
  }

  const { description, status, title, taskId } = parsed.data;

  if (!isAuthorized) {
    throw new Error("Un-Authorized");
  }

  try {
    assert(user, "User not found");
    assert(isAuthorized, "Un-Authorized");
    //   start the transaction
    await db.transaction(async (tsx) => {
      // validate the task if it's exist or not
      const taskExists = await tsx.query.taskTable.findFirst({
        where: (f, { eq }) => eq(f.id, taskId),
      });

      if (!taskExists?.id) {
        throw new Error("Task does not exists.");
      }

      // store the task details
      await tsx
        .update(taskTable)
        .set({
          title,
          description,
          status,
          tenantId: user?.id,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(taskTable.id, taskId))
        .returning();
    });
  } catch (e) {
    console.error(e);
    throw new Error(
      (e as Error).message ??
        "Something went wrong. Task update failed try again."
    );
  }

  //   revalidate
  revalidatePath("/dashboard/task");

  return {
    success: true,
    message: "Task Updated",
  };
};

// Update Status
export const updateStatus = async (data: unknown) => {
  // Auth check
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const isAuthorized = (await getPermission("crud:task"))?.isGranted;

  if (!authenticated) {
    throw new Error("Un-Authorized");
  }

  if (!isAuthorized) {
    throw new Error("Un-Authorized");
  }
  // validate
  const parsed = updateTaskSchema.safeParse(data);
  if (!parsed.success) {
    return {
      formError: parsed?.error.flatten().fieldErrors,
      success: false,
      message: "Parsing error",
    };
  }

  const { status, taskId } = parsed.data;
  // start transaction
  await db.transaction(async (tsx) => {
    await tsx
      .update(taskTable)
      .set({
        status,
      })
      .where(eq(taskTable.id, taskId))
      .returning();
  });

  return {
    success: true,
    message: "Status Updated",
  };
};
