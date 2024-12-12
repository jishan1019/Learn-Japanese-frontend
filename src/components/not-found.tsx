"use client";

import { Hi2Icons, Images } from "@/constant";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={Images.NotFoundImg || "/not-found.webp"}
          alt="Not Found"
          width={563}
          height={450}
          className="select-none w-96"
          placeholder="blur"
          priority={true}
          draggable={false}
        />
        <p className="text-base md:text-lg mt-3 px-4 md:px-0 text-center">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="py-2 px-6 text-black"

          //   className={buttonVariants({
          //     size: "sm",
          //     className: "mt-5 text-xs flex items-center gap-2",
          //   })}
        >
          <Hi2Icons.HiOutlineArrowLongLeft />
          Go home
        </Link>
      </div>
    </div>
  );
}
