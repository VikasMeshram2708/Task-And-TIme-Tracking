"use server";

import { db } from "@/db";
import { timeLogs } from "@/db/schema/schema";
import { createTimeSchema } from "@/model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 * Server Actions for TimeLog Table
 */

// create a time log
export const createTimeLog = async (data: unknown) => {
  //   console.log("incd", data);
  // Auth
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

  // Sanitize
  const parsed = createTimeSchema.safeParse(data);
  if (!parsed.success) {
    const er = parsed.error.flatten().fieldErrors;
    // console.log("formError", er);
    return {
      success: true,
      formError: er,
      message: "Parsing error",
    };
  }
  // store into db
  const { duration, taskId, startTime, endTime } = parsed.data;
  await db.transaction(async (tsx) => {
    await tsx.insert(timeLogs).values({
      duration: duration,
      startTime: startTime,
      endTime: endTime,
      taskId: taskId,
    });
  });

  return {
    success: true,
  };
};
