import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DeleteIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminAreaPage() {
  const { getPermission } = getKindeServerSession();
  const isAdmin = await getPermission("delete:user");
  if (!isAdmin) {
    redirect("/dashboard");
  }
  const usersLists = [
    {
      name: "test1",
      email: "test1@gmail.com",
      role: "USER",
    },
    {
      name: "test2",
      email: "test2@gmail.com",
      role: "USER",
    },
    {
      name: "test3",
      email: "test3@gmail.com",
      role: "USER",
    },
    {
      name: "test4",
      email: "test4@gmail.com",
      role: "USER",
    },
  ];
  return (
    <div className="p-5 min-h-screen">
      <aside>
        <ul className="bg-gray-200 rounded-lg p-5 space-y-4">
          {usersLists?.map((user) => (
            <article key={user?.email} className="flex items-center gap-4">
              <Label className="capitalize">{user?.name}</Label>
              <Button variant={"destructive"}>
                <DeleteIcon />
                Remove User
              </Button>
            </article>
          ))}
        </ul>
      </aside>
    </div>
  );
}
