/**
 * API to fetch time logs for a specific task
 * @param request - The incoming request
 * @returns Time logs for the specified task
 */
import { db } from "@/db";
import { timeLogs, taskTable } from "@/db/schema/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return new Response(JSON.stringify({ error: "Task ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Authentication checks
    const { getPermission, isAuthenticated, getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated();
    const hasPermission = await getPermission("crud:task");
    const user = await getUser();

    if (!isAuth || !hasPermission?.isGranted || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify the task belongs to the user
    const task = await db.query.taskTable.findFirst({
      where: and(eq(taskTable.id, taskId), eq(taskTable.tenantId, user.id)),
    });

    if (!task) {
      return new Response(
        JSON.stringify({ error: "Task not found or access denied" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get time logs for the task
    const logs = await db.query.timeLogs.findMany({
      where: eq(timeLogs.taskId, taskId),
      orderBy: (logs) => [logs.startTime],
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: logs,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
