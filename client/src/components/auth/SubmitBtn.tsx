import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export default function SubmitBtn({ isLoading, children, className,loadingText }: Props) {
  return (
    <Button type="submit" className={cn("w-full flex gap-2", className)}>
      {isLoading ? (
        <span className="flex gap-2">
          <Spinner className="text-secondary w-4 h-4" size="small" /> {loadingText}
        </span>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
}
