"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  User,
  FileText,
  Briefcase,
  LogOut,
  Book,
  BookOpenText,
  NotebookText,
  FileVideo,
  MonitorPlay,
  Menu,
  X,
} from "lucide-react";
import { Config } from "@/config";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isLargeScreen]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {!isLargeScreen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-green-500 text-white rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed top-0 left-0 h-screen bg-green-500 z-10 text-white flex flex-col transition-all duration-300 ${
            isOpen ? "w-64" : "w-16"
          } lg:w-64 lg:relative`}
        >
          <div className="p-5 flex items-center justify-between lg:justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg md:text-2xl font-bold ml-10 md:ml-0">
                {Config.title}
              </span>
            </Link>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2 px-3">
              {[
                { href: "/dashboard", label: "Dashboard", icon: Home },
                {
                  href: "/dashboard/add-lesson",
                  label: "Add Lesson",
                  icon: Book,
                },
                {
                  href: "/dashboard/manage-lesson",
                  label: "Manage Lesson",
                  icon: BookOpenText,
                },
                {
                  href: "/dashboard/add-vocabulary",
                  label: "Add Vocabulary",
                  icon: FileText,
                },
                {
                  href: "/dashboard/manage-vocabulary",
                  label: "Manage Vocabulary",
                  icon: NotebookText,
                },
                {
                  href: "/dashboard/add-tutorial",
                  label: "Add Tutorial",
                  icon: FileVideo,
                },
                {
                  href: "/dashboard/manage-tutorial",
                  label: "Manage Tutorial",
                  icon: MonitorPlay,
                },
                {
                  href: "/dashboard/manage-user",
                  label: "Manage User",
                  icon: User,
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 hover:bg-green-600 rounded-lg px-4 py-2.5"
                  >
                    <item.icon size={20} />
                    <span
                      className={`transition-all duration-300 ${
                        isOpen ? "block" : "hidden lg:block"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-5">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 hover:bg-indigo-700 rounded-lg px-4 py-2.5 w-full"
            >
              <LogOut size={20} />
              <span
                className={`transition-all duration-300 ${
                  isOpen ? "block" : "hidden lg:block"
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
