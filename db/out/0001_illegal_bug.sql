ALTER TABLE "timeLogs" DROP CONSTRAINT "timeLogs_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "timeLogs" ADD CONSTRAINT "timeLogs_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE cascade;