import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Navabar() {
  return (
    <nav className="flex items-center justify-between  p-4 text-white top-0 sticky"> 
      <div className="flex items-center justify-between w-full border border-red-300 ">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="DevTrack" width={100} height={100} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {" "}
            login
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            signup
          </button>
        </div>
      </div>
    </nav>
  );
}
