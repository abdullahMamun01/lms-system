import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-secondary" htmlFor="email">
          Users name or Email
        </label>
        <Input
          id="email"
          defaultValue="David Brooks"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          defaultValue="password"
          className="w-full p-2 border rounded"
        />
        <div className="text-right">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Forget password?
          </Link>
        </div>
      </div>

      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
        Sign in
      </Button>

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
