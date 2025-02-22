"use client";
import React from "react";
import { Button } from "../ui/button";
import { Key, User } from "lucide-react";
import useAuth from "@/store/auth.store";
import { UserMenu } from "../user/UserMenu";

export default function AuthMenu() {
  const { token } = useAuth();
  return (
    <div className="flex items-center gap-4">
      {token ? (
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      ) : (
        <>
          <Button
            size="sm"
            className="bg-[#D7F4E6] text-secondary hover:text-gray-50 hover:bg:[#D7F4E6]"
          >
            Sign in
            <Key className="h-4 w-4 mr-1" />
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Signup Free
          </Button>
        </>
      )}
    </div>
  );
}
