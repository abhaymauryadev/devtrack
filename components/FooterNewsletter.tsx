"use client";

import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const footerColumns = [
  {
    title: "Product",
    links: ["Features", "Changelog", "Roadmap", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Community", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Privacy"],
  },
];

const socialIcons = [
  { icon: <FaGithub className="h-4 w-4" />, href: "#", label: "GitHub" },
  { icon: <FaTwitter className="h-4 w-4" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram className="h-4 w-4" />, href: "#", label: "Instagram" },
];

export default function FooterNewsletter() {
  return (
    <footer className="bg-[#f6f5f4] dark:bg-[#1f1f1f] border-t border-black/10 dark:border-white/8 pt-16 md:pt-20 pb-10 px-6 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        {/* Newsletter */}
        <div
          className="bg-white dark:bg-[#252525] rounded-2xl p-8 md:p-12 mb-16 border border-black/10 dark:border-white/8 transition-colors duration-200"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div>
              <h3
                className="font-bold leading-[1.23] text-black/95 dark:text-white/90 mb-3"
                style={{ fontSize: "26px", letterSpacing: "-0.625px" }}
              >
                Stay ahead with DevTrack.
              </h3>
              <p className="text-[16px] font-normal leading-relaxed text-[#615d59] dark:text-white/55 mb-6">
                Join thousands of developers building better coding habits. Get
                tips, updates, and productivity insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 text-[16px] border border-[#dddddd] dark:border-white/10 rounded-sm bg-white dark:bg-[#191919] text-black/90 dark:text-white/90 placeholder:text-[#a39e98] dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#097fe8] transition-colors"
                />
                <button className="px-5 py-2.5 text-[15px] font-semibold text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 rounded-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="text-right">
                <p
                  className="font-bold text-black/95 dark:text-white/90 mb-1"
                  style={{ fontSize: "40px", letterSpacing: "-0.5px" }}
                >
                  10,000+
                </p>
                <p className="text-[16px] font-normal text-[#615d59] dark:text-white/55">
                  developers tracking their hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <p className="text-[15px] font-bold tracking-tight text-black/95 dark:text-white/90 mb-3">
              DevTrack
            </p>
            <p className="text-[14px] font-normal leading-[1.57] text-[#615d59] dark:text-white/45 mb-6 max-w-60">
              The minimalist productivity tracker built for developers who want
              to stay in flow.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-black/10 dark:border-white/8 text-[#615d59] dark:text-white/45 hover:text-black/95 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/6 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-[14px] font-semibold text-black/95 dark:text-white/90 mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((text) => (
                  <li key={text}>
                    <a
                      href="#"
                      className="text-[14px] font-normal text-[#615d59] dark:text-white/45 hover:text-black/95 dark:hover:text-white/90 transition-colors"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/10 dark:border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] font-normal text-[#a39e98] dark:text-white/30">
            © {new Date().getFullYear()} DevTrack. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Terms of Service", "Privacy Policy", "Cookie Settings"].map(
              (text) => (
                <a
                  key={text}
                  href="#"
                  className="text-[14px] font-normal text-[#a39e98] dark:text-white/30 hover:text-black/95 dark:hover:text-white/90 transition-colors"
                >
                  {text}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
