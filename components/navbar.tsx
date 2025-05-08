import React, { Suspense } from "react";
import { Clock, LogOut } from "lucide-react";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import NavTitle from "./nav-title";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Navbar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    return (
      <nav className="w-full p-4 border-b shadow">
        <div className="max-w-7xl mx-auto flex justify-between">
          <NavTitle />
          <Suspense fallback={<Spinner />}>
            <div className="flex items-center gap-4">
              <LoginLink>Login</LoginLink>
              <RegisterLink className="border-2 px-4 py-2 rounded-md">
                Register
              </RegisterLink>
            </div>
          </Suspense>
        </div>
      </nav>
    );
  }
  return (
    <nav className="w-full p-4 border-b shadow">
      <div className="max-w-7xl mx-auto flex justify-between">
        <NavTitle />

        <Suspense fallback={<Spinner />}>
          <div className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="text-lg capitalize">{user?.given_name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={"destructive"}
              asChild
              className="bg-red-500 text-white hover:bg-red-600 rounded"
            >
              <LogoutLink>
                <LogOut />
                Logout
              </LogoutLink>
            </Button>
          </div>
        </Suspense>
      </div>
    </nav>
  );
}

function Spinner() {
  return <Clock className="transition animate-spin duration-500 ease-linear" />;
}
