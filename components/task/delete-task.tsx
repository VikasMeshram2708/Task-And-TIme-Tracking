"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTaskSchema, DeleteTaskSchema } from "@/model";
import { deleteTask } from "@/app/dal/actions";
import { Loader2 } from "lucide-react";

type DeleteProps = {
  taskId: string;
  defaultTitle: string;
};

export default function DeleteTask({ taskId, defaultTitle }: DeleteProps) {
  const form = useForm<DeleteTaskSchema>({
    defaultValues: {
      title: "",
      taskId: taskId,
    },
    resolver: zodResolver(deleteTaskSchema),
  });

  //   title parser
  function titleParser(value: string): boolean {
    if (defaultTitle !== value) {
      return false;
    }
    return true;
  }

  const onSubmit = async (data: DeleteTaskSchema) => {
    // console.log("Deleting task:", data);
    try {
      const parsed = titleParser(data.title);
      if (!parsed) {
        alert("Please enter matching Title");
        return;
      }
      //  Delete logic here
      const result = await deleteTask(data);
      if (!result.success) {
        alert(result.message ?? "Failed");
        return;
      }
      alert("Deleted");
      return;
    } catch (e) {
      console.error(e);
      alert("Failed to delete task. Please try again.");
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Delete</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-semibold text-center">
          Confirm Deletion
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    <span className="text-red-500">*</span>
                    Task Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Exact task title"
                      className="text-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    This action cannot be undone
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="ghost" type="submit">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
                type="submit"
                variant="destructive"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
