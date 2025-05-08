"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { taskSchema, TaskSchema } from "@/model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { createTask } from "@/app/dal/actions";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddTask() {
  const closeModalRef = useRef<HTMLButtonElement | null>(null);
  const form = useForm<TaskSchema>({
    defaultValues: {
      title: "",
      status: "INPROGRESS",
      description: "",
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      // console.log("Form submitted with data:", data);
      const result = await createTask(data);
      if (!result.success) {
        alert(result.message ?? "Failed");
        return;
      }
      alert("Task Created");
      //   reset the fields
      form.reset();
      //   close the modal
      closeModalRef.current?.click();
      return;
    } catch (e) {
      console.error(e);
      alert(
        (e as Error).message ?? "Something went wrong. Task creation failed."
      );
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm hover:shadow-md transition-shadow">
          <Plus className="h-4 w-4" />
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-semibold text-center">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    Task Title<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a clear task title"
                      className="focus-visible:ring-2"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    Description
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add details, notes, or context"
                      className="min-h-[120px] focus-visible:ring-2"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-3 gap-3">
              <Button
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                type="submit"
                className="px-6 font-medium transition-all hover:scale-[1.02]"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
              <Button variant={"destructive"} asChild>
                <DialogClose ref={closeModalRef}>Close</DialogClose>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
