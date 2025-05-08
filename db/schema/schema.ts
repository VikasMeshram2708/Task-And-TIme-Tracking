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

export const userTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    tenantId: uuid("tenant_id").notNull().unique(),
    ...timeStamps,
  },
  (table) => [index("tenantIdx").on(table.tenantId)]
);

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
    userId: uuid("user_id").references(() => userTable.tenantId),
    completedAt: timestamp("completed_at", { mode: "string" }),
    ...timeStamps,
  },
  (table) => [index("taskIdx").on(table.id)]
);

export const timeLogs = pgTable("timeLogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id")
    .references(() => taskTable.id)
    .notNull(),
  startTime: timestamp("start_time", { mode: "string" }).notNull(),
  endTime: timestamp("end_time", { mode: "string" }).notNull(),
  duration: text("duration").notNull(),
  ...timeStamps,
});
