# Task & Time Tracking

## Test Credentials

- Email: magori2785@bocapies.com Password: Test@123

### Steps to getting started

1. Register
2. Login
3. After login you'll be redirected to dashboard
4. Click of the Task Menu inside the sidebar then you'll be redireted to tasks page
5. Click on Create New Task button then fill in the details.
6. You can Edit, and Delete also.

### Steps to create time logs

1. After you have created task there's a start button beside the title,
2. You can Start and Stop the timer from that button.
3. Also there's a popup timer at the bottom right side that wil not update you task time tracking it'll just stop the timer it wont create new time log.

## Demo Link

- Demo Link [https://task-tracking-ruddy.vercel.app]

### Tech Stack

- Next.js(15.3.2) Frontend & Backend
- Framer Motion for animations
- Tailwind CSS and ShadcnUI for reusable components
- Supabase Cloud DB Instance (Postgres)
- Drizzle-Kit ORM for schema generation and migration.
- Kinde Auth for Authentication and Authorization.
- Husky automate task for linting, testing before commits or pushes with pre-define script.
- Vercel for Deployment

## TODO

- [x] Authentication & Authorization (login, register,logout)

- [x] Task CRUD Operations (title, description) update status (pending, in progress, completed).

- [x] Real-Time Tracking (start-stop time tracking)

  - [x] Start tracking with start button.
  - [x] End tracking with stop button.
  - [x] Store each session as a time log entry.
  - [x] Show elapse time while tracking is active.

- [x] User must be able to view all time logs
- [x] View total time spent on each task.

- [x] Daily Summary

  - [x] Create a view that display a summary for the current day, including tasks worked on, total time tracked,completed tasks, task still in progress or pending

- [x] API & backend

  - [x] CRUD Operations for tasks and time logs.
  - [x] Proper authorization on every endpoint. Input validation, error handling, and meaningful HTTP responses organized route and controller logic.

- [x] Test credentials for easier review deliverables.
