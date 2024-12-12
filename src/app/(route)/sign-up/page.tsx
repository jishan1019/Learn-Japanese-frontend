import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Images } from "@/constant";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="container bg-gray-50 flex justify-center items-center mx-auto min-h-screen">
      <div className="hidden  w-full md:hidden lg:w-1/2 bg-white min-h-screen lg:flex justify-center items-center">
        <Image
          src={Images.Login}
          alt="Student studying illustration"
          width={600}
          height={600}
          className="w-full h-full p-24"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 m-4 md:m-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px] shadow-md py-10 px-6 rounded bg-white">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-green-500">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
