import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-2 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-[100px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
