
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/zod/auth.schema";
import ControlledInput from "../forms/ControlledInput";
import { ILogin } from "@/interfaces/auth.interface";
import toast from "react-hot-toast";
import useAuth from "@/store/auth.store";
import { useRouter } from "next/navigation";
import SubmitBtn from "./SubmitBtn";
import { loginAction } from "@/actions/auth.action";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { setAuth } = useAuth();
  const form = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit, setError } = form;
  const onSubmit = async (formData: ILogin) => {
    setIsLoading(true);
    try {
      const { data } = await loginAction(formData);
      console.log(data)
      setIsLoading(false);
      toast.success("Login successfully");
      setAuth({
        user: data.user,
        token: data.accessToken,
      });
      router.push("/");
    } catch (err: unknown) {
      setError("password", { message: "invalid email or password" });
      setIsLoading(false );
      console.log(err)
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm text-secondary" htmlFor="email">
          Users name or Email
        </label>
        <ControlledInput
          control={form.control}
          name="email"
          placeholder="Enter your email"
          type="email"
          required
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
        loadingText="Signing in..."
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        Sign in
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
        Dont have an account?{" "}
        <Link href="#" className="text-secondary/90 hover:text-secondary">
          Create Account
        </Link>
      </p>
    </form>
  );
}
