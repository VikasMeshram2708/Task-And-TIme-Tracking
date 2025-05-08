# Task & Time Tracking

## Test Credentials

- Email: nojikex578@bocapies.com Password: Test@123

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

- [ ] Task CRUD Operations (title, description) update status (pending, in progress, completed).

- [ ] Real-Time Tracking (start-stop time tracking)

  - [ ] Start tracking with start button.
  - [ ] End tracking with stop button.
  - [ ] Store each session as a time log entry.
  - [ ] Show elapse time while tracking is active.

- [ ] User must be able to view all time logs
- [ ] View total time spent on each task.

- [ ] Daily Summary

  - [ ] Creat a view that display a summary for the current day, including tasks worked on, total time tracked,completed tasks, task still in progress or pending

- [ ] API & backend

  - [ ] CRUD Operations for tasks and time logs.
  - [ ] Proper authorization on every endpoint. Input validation, error handling, and meaningful HTTP responses organized route and controller logic.

- [ ] Test credentials for easier review deliverables.
