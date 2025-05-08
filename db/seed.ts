import { db } from ".";
import { timeLogs } from "./schema/schema";
// import { taskTable, timeLogs, userTable } from "./schema/schema";

// // Create the formatter
// const timestampFormatter = new Intl.DateTimeFormat("en-IN", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   fractionalSecondDigits: 2,
//   hour12: false,
// });

// // Helper function to format dates
// function formatDateToDatabaseString(date: Date): string {
//   const parts = timestampFormatter.formatToParts(date);

//   // Extract parts from the formatter
//   const year = parts.find((p) => p.type === "year")?.value;
//   const month = parts.find((p) => p.type === "month")?.value;
//   const day = parts.find((p) => p.type === "day")?.value;
//   const hour = parts.find((p) => p.type === "hour")?.value;
//   const minute = parts.find((p) => p.type === "minute")?.value;
//   const second = parts.find((p) => p.type === "second")?.value;
//   const fractionalSecond = parts.find(
//     (p) => p.type === "fractionalSecond"
//   )?.value;

//   // Construct the database-friendly string
//   return `${year}-${month}-${day} ${hour}:${minute}:${second}.${fractionalSecond}`;
// }

// async function main() {
//   console.log("Starting seed...");

//   await db.transaction(async (tx) => {
//     const [user] = await tx
//       .insert(userTable)
//       .values({
//         email: "test1@gmail.com",
//         password: "test1",
//         name: "test1",
//         tenantId: crypto.randomUUID(),
//       })
//       .returning();

//     // Create task
//     const [task] = await tx
//       .insert(taskTable)
//       .values({
//         title: "Task1",
//         description: `small description about task 1 - ${Date.now().toString()}`,
//         completedAt: formatDateToDatabaseString(new Date()), // Use formatter here
//         status: "INPROGRESS",
//         userId: user.tenantId,
//       })
//       .returning();

//     const startedOn = new Date();
//     const endedOn = new Date(startedOn.getTime() + 2 * 60 * 60 * 1000);
//     const durationMs = endedOn.getTime() - startedOn.getTime();

//     // Create timeLog with formatted timestamps
//     await tx
//       .insert(timeLogs)
//       .values({
//         startTime: formatDateToDatabaseString(startedOn),
//         endTime: formatDateToDatabaseString(endedOn),
//         duration: durationMs.toString(),
//         taskId: task.id,
//       })
//       .returning();
//   });

//   console.log("Transaction completed successfully");
// }

const start = new Date().toISOString();
async function main() {
  console.log("seed started");
  await db
    .insert(timeLogs)
    .values({
      startTime: start,
      endTime: new Date().toISOString(),
      duration: "2 hours",
      taskId: "855b3550-0e52-46af-bc8f-9af2db2e52c0",
    })
    .returning();
  console.log("seed finised");
}
main()
  .then(() => console.log("Seed success"))
  .catch((e) => {
    console.error("Seed failed:");
    console.error(e);
    process.exit(1);
  });
