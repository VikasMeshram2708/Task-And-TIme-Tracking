import SummaryTabs from "@/components/dashboard/summary/summary-tabs";
import Profile from "@/components/profile";
import { db } from "@/db";
import { taskTable } from "@/db/schema/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { count, eq } from "drizzle-orm";
import { Activity } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  const user = await getUser();
  if (!user) return notFound();

  const [totalTasks] = await db
    .select({ count: count() })
    .from(taskTable)
    .where(eq(taskTable.tenantId, user?.id));

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex items-center gap-2">
        <Activity className="text-primary" size={36} />
        <p className="text-lg sm:text-xl md:text-2xl font-bold">
          Summary
          <span className="pl-10">{new Date().toDateString()}</span>
        </p>
      </div>

      <Profile totalTasks={totalTasks.count} />
      <SummaryTabs />
    </div>
  );
}
