import { ArrowRight, CheckCircle, Clock, BarChart2 } from "lucide-react";
import CtaBtn from "./cta-btn";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 to-transparent" />

      {/* Hero content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left column - Copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="font-medium">New Feature</span>
              <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                Smart Reports
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Track Your Tasks,{" "}
              <span className="text-primary">Master Your Time</span>
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Boost your productivity with our intuitive task management and
              time tracking platform. Never miss a deadline again and gain
              valuable insights into how you spend your time.
            </p>

            {/* Feature list */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: CheckCircle, text: "Simple task management" },
                { icon: Clock, text: "Effortless time tracking" },
                { icon: BarChart2, text: "Insightful productivity reports" },
                { icon: ArrowRight, text: "Seamless workflow integration" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Animated App Preview */}
          <div className="relative lg:pl-8">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-10 bg-muted flex items-center px-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto bg-background/80 rounded-md px-3 py-1 text-xs">
                  TaskTracker Pro Dashboard
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="pt-12 pb-4 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Today's Tasks Preview */}
                  <div className="col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Today's Tasks</h3>
                      <span className="text-xs text-muted-foreground">
                        May 9, 2025
                      </span>
                    </div>

                    {/* Task Items */}
                    {[
                      {
                        title: "Product meeting",
                        time: "1h 20m",
                        complete: true,
                      },
                      {
                        title: "Prepare Q2 report",
                        time: "45m",
                        complete: false,
                      },
                      {
                        title: "Client presentation",
                        time: "2h 15m",
                        complete: false,
                      },
                    ].map((task, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border flex justify-between items-center ${
                          task.complete
                            ? "border-primary/40 bg-primary/5"
                            : "border-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-4 w-4 rounded-full ${
                              task.complete
                                ? "bg-primary"
                                : "border border-muted-foreground"
                            }`}
                          >
                            {task.complete && (
                              <CheckCircle className="h-4 w-4 text-primary-foreground" />
                            )}
                          </div>
                          <span
                            className={
                              task.complete
                                ? "line-through text-muted-foreground"
                                : ""
                            }
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time Chart */}
                  <div className="border rounded-lg p-3">
                    <h3 className="font-medium text-sm mb-2">Time Tracked</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Development", value: 70, color: "bg-primary" },
                        { name: "Meetings", value: 45, color: "bg-blue-500" },
                        { name: "Planning", value: 25, color: "bg-amber-500" },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{item.name}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-xs text-muted-foreground">
                  Productivity
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 h-20 w-48 rounded-xl bg-background shadow-lg border flex items-center p-3 gap-3">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Task Completed
                </div>
                <div className="font-medium">Daily Report</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-muted/50 p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Active Users", value: "10K+" },
              { label: "Tasks Created", value: "1.2M" },
              { label: "Hours Tracked", value: "850K" },
              { label: "Productivity Boost", value: "35%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
