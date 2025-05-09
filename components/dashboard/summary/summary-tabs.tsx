"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@/types";

import { TaskList } from "./task-list";

export default function SummaryTabs() {
  const [activeTab, setActiveTab] = useState<
    "COMPLETED" | "INPROGRESS" | "PENDING"
  >("COMPLETED");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [counts, setCounts] = useState({
    COMPLETED: 0,
    INPROGRESS: 0,
    PENDING: 0,
    TOTAL: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/summary/tasks?status=${activeTab}`);
        const result = await response.json();

        if (result.success) {
          setTasks(result.data || []);
          setCounts(
            result.counts || {
              COMPLETED: 0,
              INPROGRESS: 0,
              PENDING: 0,
              TOTAL: 0,
            }
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [activeTab]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as typeof activeTab)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="COMPLETED">
          Completed ({counts.COMPLETED})
        </TabsTrigger>
        <TabsTrigger value="INPROGRESS">
          In Progress ({counts.INPROGRESS})
        </TabsTrigger>
        <TabsTrigger value="PENDING">Pending ({counts.PENDING})</TabsTrigger>
      </TabsList>

      {isLoading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : (
        <>
          <TabsContent value="COMPLETED">
            <TaskList tasks={tasks.filter((t) => t.status === "COMPLETED")} />
          </TabsContent>
          <TabsContent value="INPROGRESS">
            <TaskList tasks={tasks.filter((t) => t.status === "INPROGRESS")} />
          </TabsContent>
          <TabsContent value="PENDING">
            <TaskList tasks={tasks.filter((t) => t.status === "PENDING")} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
