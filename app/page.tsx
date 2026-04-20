import Hero from "@/sections/Hero";
import Navabar from "@/components/Navabar";
import Features from "@/sections/Features";
import Testimonials from "@/sections/Testimonials";
import TextReveal from "@/sections/TextReveal";
import FooterNewsletter from "@/components/FooterNewsletter";
import Screen from "./screen/page"

export default function Home() {
  return (
    <div>
      <Navabar />
      <Hero />
      <Features/>
      <Testimonials/>
      <TextReveal/>
      <FooterNewsletter/>
    </div>
  );
}
