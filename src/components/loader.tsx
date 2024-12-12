import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <LoaderCircle size={30} className="animate-spin text-green-500" />
    </div>
  );
}
