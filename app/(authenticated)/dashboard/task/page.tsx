import { Button } from "@/components/ui/button";
import { DeleteIcon, PlusIcon } from "lucide-react";
import React from "react";

export default function TaskPage() {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <Button>
          <PlusIcon />
          New
        </Button>
        <Button variant={"destructive"}>
          <DeleteIcon />
          Delete Task
        </Button>
      </div>
    </div>
  );
}
