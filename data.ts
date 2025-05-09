import { Home, TimerIcon, LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  isAdmin: boolean;
  requiresAuth: boolean;
  icon: LucideIcon;
}
export const navItems: NavItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    isAdmin: false,
    requiresAuth: true,
  },
  {
    title: "Task",
    url: "/dashboard/task",
    icon: TimerIcon,
    isAdmin: false,
    requiresAuth: true,
  },
];
