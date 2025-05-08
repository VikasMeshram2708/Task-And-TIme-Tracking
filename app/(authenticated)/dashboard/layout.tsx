import DashBreadCrumb from "@/components/dashboard/dash-breadcrumb";
import { TaskSidebar } from "@/components/dashboard/task-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <TaskSidebar />
      <main className="w-full p-5 space-y-4">
        <DashBreadCrumb />
        <div className="py-2">{children}</div>
      </main>
    </SidebarProvider>
  );
}
