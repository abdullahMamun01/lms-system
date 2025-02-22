import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/zod/auth.schema";
import { IRegister } from "@/interfaces/auth.interface";
import ControlledInput from "../forms/ControlledInput";
import { register } from "@/services/authService";
import SubmitBtn from "./SubmitBtn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit,setError } = form;
  const onSubmit = async (data: IRegister) => {
    setIsLoading(true);
    try {
      await register(data);
      setIsLoading(false);
      router.push("/signin");
      toast.success("Registration successfully");
    } catch (err) {
      const error = err as Error;
      console.log(error);
      setIsLoading(false);
      setError("password", { message: error.message });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm text-secondary" htmlFor="firstName">
          Enter your first name
        </label>
        <ControlledInput
          name="firstName"
          control={form.control}
          label="First name"
          type="text"
          placeholder="Enter your first name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-secondary" htmlFor="lastName">
          Enter your last name
        </label>
        <ControlledInput
          name="lastName"
          control={form.control}
          label="Last name"
          type="text"
          placeholder="Enter your first name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-secondary" htmlFor="email">
          Users name or Email
        </label>
        <ControlledInput
          name="email"
          control={form.control}
          label="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500" htmlFor="password">
          Password
        </label>
        <ControlledInput
          control={form.control}
          name="password"
          placeholder="Enter your password"
          type="password"
          required
          defaultValue="password"
          className="w-full p-2 border rounded"
        />
        <div className="text-right">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Forget password?
          </Link>
        </div>
      </div>

      <SubmitBtn
        isLoading={isLoading}
        loadingText="Signup..."
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        signup
      </SubmitBtn>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500">
        already have an account?{" "}
        <Link href="/signin" className="text-secondary/90 hover:text-secondary">
          login Account
        </Link>
      </p>
    </form>
  );
}
