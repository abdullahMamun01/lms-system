/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useController, Control } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface ControlledInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  required = false,
  className= "",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue,
  });

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        {...field}
        type={type}
        id={name}
        placeholder={placeholder}
        className={cn(
          `${className}`,
          error ? "border-red-500" : "border-gray-300"
        )}
      />
      {error && <span className="text-red-500 text-xs mt-2">{error.message}</span>}
    </div>
  );
};

export default ControlledInput;
