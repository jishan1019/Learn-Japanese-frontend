"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Config } from "@/config";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export function Header() {
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const handelLogout = () => {
    dispatch(logout());
    toast.success("Log out successfully");
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-green-500 ml-2">
            {Config.title}
          </span>
        </Link>

        <div className="hidden md:flex items-center justify-end gap-8 text-sm mr-4">
          <Link
            className={`${
              pathname === "/lesson" ? "text-green-500 underline" : ""
            }`}
            href="/lesson"
          >
            Lesson
          </Link>
          <Link
            className={`${
              pathname === "/tutorial" ? "text-green-500 underline" : ""
            }`}
            href="/tutorial"
          >
            Tutorial
          </Link>
          <Link
            onClick={() => handelLogout()}
            href="/"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-3 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>Lesson</DropdownMenuItem>
              <DropdownMenuItem>Tutorial</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
