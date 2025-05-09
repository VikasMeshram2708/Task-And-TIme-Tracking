import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const timeStamps = {
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
};

export const taskStatus = pgEnum("task_status", [
  "INPROGRESS",
  "COMPLETED",
  "PENDING",
]);

export const taskTable = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: taskStatus().default("PENDING"),
    tenantId: text("tenant_id").notNull(),
    completedAt: timestamp("completed_at", { mode: "string" }),
    ...timeStamps,
  },
  (table) => [index("taskIdx").on(table.id)]
);

export const timeLogs = pgTable("timeLogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id")
    .references(() => taskTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }).notNull(),
  duration: text("duration").notNull(),
  ...timeStamps,
});
