import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();
  const isAdmin = (await getPermission("delete:user"))?.isGranted;
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  const user = await getUser();
  if (!user) return notFound();

  return (
    <div className="min-h-screen">
      <h2>Summary</h2>
      <Card>
        <small>Logged in as {user?.given_name}</small>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Badge>Role : {isAdmin ? "Admin" : "User"}</Badge>
      </Card>
    </div>
  );
}
