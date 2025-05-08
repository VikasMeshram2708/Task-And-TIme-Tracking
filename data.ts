import {
  ShieldCheck,
  Home,
  TimerIcon,
  Settings,
  LucideIcon,
} from "lucide-react";

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
  {
    title: "Admin",
    url: "/dashboard/admin",
    icon: ShieldCheck,
    isAdmin: true,
    requiresAuth: true,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    isAdmin: false,
    requiresAuth: true,
  },
];
