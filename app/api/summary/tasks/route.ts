/**
 * API to fetch the tasks with their corresponding status and count.
 * @returns tasks with corresponding status and count
 */
import { db } from "@/db";
import { taskTable } from "@/db/schema/schema";
import { Status } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { count, eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

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

    // Base query conditions
    const baseConditions = eq(taskTable.tenantId, user.id);

    // Get filtered tasks
    const tasks = await db.query.taskTable.findMany({
      where: status
        ? and(baseConditions, eq(taskTable.status, status as Status))
        : baseConditions,
    });

    // Get counts for each status (optimized parallel queries)
    const countQueries = await Promise.all([
      db
        .select({ count: count() })
        .from(taskTable)
        .where(and(baseConditions, eq(taskTable.status, "COMPLETED"))),
      db
        .select({ count: count() })
        .from(taskTable)
        .where(and(baseConditions, eq(taskTable.status, "INPROGRESS"))),
      db
        .select({ count: count() })
        .from(taskTable)
        .where(and(baseConditions, eq(taskTable.status, "PENDING"))),
      db.select({ count: count() }).from(taskTable).where(baseConditions),
    ]);

    // Extract counts from query results
    const counts = {
      COMPLETED: countQueries[0][0]?.count || 0,
      INPROGRESS: countQueries[1][0]?.count || 0,
      PENDING: countQueries[2][0]?.count || 0,
      TOTAL: countQueries[3][0]?.count || 0,
    };

    return new Response(
      JSON.stringify({
        success: true,
        data: tasks,
        counts,
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
