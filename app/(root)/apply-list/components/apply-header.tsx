"use client";

import { Button } from "@/components/shadcn/button";
import { PlusIcon } from "lucide-react";

export default function ApplyHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between pb-2">
      <p className="text-muted-foreground">Total applications: {count}</p>
      <Button variant="outline" color="primary" size="sm">
        <PlusIcon className="size-4" />
        Add Application
      </Button>
    </div>
  );
}
