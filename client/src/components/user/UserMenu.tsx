"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/store/auth.store";
import { BookOpen, LogOut, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";


export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter()
  const avatarImage = `https://ui-avatars.com/api/?${user?.firstName.slice(0, 1)}${user?.lastName.slice(0, 1)}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={avatarImage} alt={user?.firstName}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>
          {/* <p className="text-sm text-gray-500">{user?.email}</p> */}
        </div>

        <Link
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <User className="mr-3 h-4 w-4" />
          Your Profile
        </Link>

        {
          user?.role === 'ADMIN' ?
          <Link
          href="/dashboard"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <BookOpen className="mr-3 h-4 w-4" />
          Go To Dashboard
        </Link>
        :
        <Link
          href="/my-courses"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <BookOpen className="mr-3 h-4 w-4" />
          Go To Courses
        </Link>
        }
        

        <button
          onClick={() => {
            // Handle logout
            logout();
            router.push('/signin')

          }}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </button>
      </PopoverContent>
    </Popover>
  );
}
