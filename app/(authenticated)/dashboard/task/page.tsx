import AddTask from "@/components/task/add-task";
import TaskSearchBar from "@/components/task/task-search-bar";
import Tasks from "@/components/task/tasks";
import TasksFallback from "@/components/tasks-fallback";
import { db } from "@/db";
import { taskTable } from "@/db/schema/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function TaskPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) notFound();

  const [tasksCount] = await db
    .select({ count: count() })
    .from(taskTable)
    .where(eq(taskTable.tenantId, user.id));

  const tasks = await db.query.taskTable.findMany({
    where: (fields, { eq }) => eq(fields.tenantId, user.id),
    orderBy: (f, { desc }) => desc(f.createdAt),
  });

  return (
    <main className="space-y-6">
      <section className="flex items-center justify-between flex-wrap gap-4">
        <TaskSearchBar />
        <AddTask />
      </section>

      <section>
        {tasksCount?.count > 0 ? (
          <Suspense fallback={<TasksFallback />}>
            <Tasks tasks={tasks} />
          </Suspense>
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <p className="text-lg font-medium">No tasks found.</p>
            <p className="text-sm">Start by creating your first task.</p>
          </div>
        )}
      </section>
    </main>
  );
}
