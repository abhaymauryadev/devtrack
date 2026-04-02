import Hero from "@/sections/Hero";
import Navabar from "@/components/Navabar";
import Features from "@/sections/Features";
import Testimonials from "@/sections/Testimonials";
import TextReveal from "@/sections/TextReveal";
export default function Home() {
  return (
    <div className="">
      <Navabar />
      <Hero />
      <Features/>
      <Testimonials/>
      <TextReveal/>

      {/* <div className="flex gap-4">
        <Link
          href="/tracker"
          passHref
          className="px-6 py-3 bg-blue-500 text-white rounded-xl"
        >
          Go to Tracker
        </Link

        <Link
          href="/logs"
          passHref
          className="px-6 py-3 bg-gray-800 text-white rounded-xl"
        >
          View Logs
        </Link>
      </div> */}
    </div>
  );
}
