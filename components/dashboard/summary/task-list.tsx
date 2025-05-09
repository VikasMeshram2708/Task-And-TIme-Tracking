"use client";
import { Status, Task, TrackLog } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Timer } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center rounded-lg border border-dashed flex flex-col items-center justify-center gap-2">
        <Clock className="mx-auto h-10 w-10 text-muted-foreground opacity-40" />
        <p className="text-muted-foreground font-medium">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tasks.map((task, idx) => (
        <TaskCard key={task.id} task={task} index={idx + 1} />
      ))}
    </div>
  );
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-sm">
                #{index}
              </span>
              <TaskStatusBadge status={task.status as Status} />
            </div>
            <CardTitle className="text-lg mt-1">{task.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <CardDescription>
            <TaskTimeLog taskId={task.id} />
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskStatusBadge({ status }: { status: string }) {
  const variants = {
    COMPLETED: {
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      icon: CheckCircle,
    },
    INPROGRESS: {
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      icon: Timer,
    },
    PENDING: {
      className:
        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
      icon: AlertCircle,
    },
    DEFAULT: {
      className:
        "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
      icon: AlertCircle,
    },
  };

  const { className, icon: Icon } =
    status in variants
      ? variants[status as keyof typeof variants]
      : variants.DEFAULT;

  return (
    <Badge
      variant="outline"
      className={`px-2 py-0 text-xs font-medium ${className}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </Badge>
  );
}

function TaskTimeLog({ taskId }: { taskId: string }) {
  const [logs, setLogs] = useState<TrackLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/api/summary/timelog/?taskId=${taskId}`);
        if (!response.ok) throw new Error("Failed to fetch logs");
        const { data } = await response.json();
        setLogs(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching time logs"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [taskId]);

  const formatDuration = (seconds: string) => {
    const secNum = parseFloat(seconds);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum % 3600) / 60);
    const secs = Math.floor(secNum % 60);
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    return parts.join(" ");
  };

  if (loading) {
    return <Skeleton className="h-4 w-24 rounded" />;
  }

  if (error) {
    return <span className="text-destructive text-xs">Failed to load</span>;
  }

  if (logs.length === 0) {
    return (
      <span className="text-muted-foreground text-xs">Not tracked yet</span>
    );
  }

  // Calculate total time across all logs
  const totalSeconds = logs.reduce(
    (sum, log) => sum + parseFloat(log.duration),
    0
  );
  const formattedTotal = formatDuration(totalSeconds.toString());

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <span className="font-medium text-sm">{formattedTotal}</span>
      {logs.length > 1 && (
        <Badge variant="secondary" className="text-xs">
          {logs.length} sessions
        </Badge>
      )}
    </div>
  );
}
