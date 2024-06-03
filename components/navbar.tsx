"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CompassIcon,
  HeartIcon,
  LogOut,
  MessageCircleIcon,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { User } from "@supabase/supabase-js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import tindog from "../public/tindog.svg";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth";

export default function Navbar({ user }: { user: User | null }) {
  const router = useRouter();
  const handleLogout = async () => {
    // Check if we have a user

    if (user) {
      await signOut();
    }

    router.push("/sign-in");
  };
  return (
    <header className="flex items-center w-full h-16 px-4 md:px-6  bg-white dark:bg-gray-800 shadow">
      <nav className="flex items-center justify-between w-full gap-4 sm:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-sm font-semibold"
          prefetch={false}
        >
          <Image
            src={tindog}
            alt="Logo de Tindog"
            width={40}
            priority={true}
            className="h-8 w-8"
          />
          <span className="hidden sm:block">TinderPet</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            prefetch={false}
          >
            <CompassIcon className="h-5 w-5" />
            <span className="hidden sm:block">Discover</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            prefetch={false}
          >
            <HeartIcon className="h-5 w-5" />
            <span className="hidden sm:block">Matches</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 text-gray-500 dark:text-gray-400 "
            prefetch={false}
          >
            <MessageCircleIcon className="h-5 w-5" />
            <span className="hidden sm:block">Messages</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <p className="hidden sm:block text-sm font-semibold ">
                    Signed in as:
                  </p>
                  <p className="hidden sm:block text-xs">{user?.email} </p>
                </div>
                <Button variant="ghost" size="icon" className="full-rounded">
                  <span className="sr-only">Open user menu</span>

                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {user?.user_metadata?.first_name[0]}{" "}
                      {user?.user_metadata?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
