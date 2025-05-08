"use client";
import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { navItems as items } from "@/data";

export function TaskSidebar() {
  const { getPermission } = useKindeBrowserClient();
  const isAdmin = getPermission("delete:user")?.isGranted; // Check for admin-level permission

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Show Admin link only for admin users
                if (item.isAdmin && !isAdmin) {
                  return null; // Hide the Admin menu item for non-admin users
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <LogoutLink className="bg-red-500/90 hover:bg-red-500 text-white transition-colors ease-in-out flex items-center gap-3 px-4 p-2 rounded-md justify-center">
          <LogOut />
          Logout
        </LogoutLink>
      </SidebarFooter>
    </Sidebar>
  );
}
