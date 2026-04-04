"use client"
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Navabar() {
   const router = useRouter();


   const login_page = () => {
    router.push('/login'); // Navigates to /about
  };

  return (
    <nav className="flex items-center justify-between  p-4 text-white top-0 sticky z-50"> 
      <div className="flex items-center justify-between w-full border border-red-300 ">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="DevTrack" width={100} height={100} />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={login_page} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            {" "}
            login
          </button>
          <button  className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
            signup 
          </button>
        </div>
      </div>
    </nav>
  );
}
