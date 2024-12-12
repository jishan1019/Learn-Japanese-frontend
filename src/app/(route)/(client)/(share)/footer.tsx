import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { Config } from "@/config";

export function Footer() {
  return (
    <footer className="bg-gray-50 shadow">
      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-green-500">
              <BookOpenCheck />
              <span className="text-xl font-bold">{Config.title}</span>
            </div>
            <p className="text-sm text-muted-foreground break-words">
              {Config.fullTitle}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-green-500">
              Class
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/lesson"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Lesson
              </Link>
              <Link
                href="/tutorial"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Tutorial
              </Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-green-500">
              Company
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About us
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-green-500">
              Legal
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of use
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookie policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
