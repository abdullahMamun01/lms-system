import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  handleClick?: () => void;
  size?: "default" | "sm" | "lg" | "icon" 
}

export default function SubmitBtn({
  isLoading,
  children,
  className,
  loadingText,
  handleClick,
  size
}: Props) {
  return (
    <Button
    size={size}
      onClick={handleClick}
      type="submit"
      className={cn("w-full flex gap-2", className)}
    >
      {isLoading ? (
        <span className="flex gap-2">
          <Spinner className="text-secondary w-4 h-4" size="small" />{" "}
          {loadingText}
        </span>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
}
