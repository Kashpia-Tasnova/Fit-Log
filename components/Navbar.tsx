"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import logoImage from "../assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Workout is active on Home and individual workout pages
  const isWorkoutPage =
    pathname === "/" || pathname.startsWith("/workout/");

  const isMyPlanPage = pathname === "/my-plan";

  // Go to Workout Library
  const handleWorkoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/") {
      const library = document.getElementById("library");

      if (library) {
        library.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      router.push("/#library");
    }
  };

  // When coming from another page to /#library
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#library") {
      const library = document.getElementById("library");

      if (library) {
        setTimeout(() => {
          library.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#292929] bg-[#0b0b0b]">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src={logoImage}
            alt="FitLog Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />

        <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
  FITLOG
</span>
          
        </Link>

        {/* Main Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">

         {/* Workouts */}
<Link
  href="/#library"
  onClick={handleWorkoutClick}
  style={{
    color: isWorkoutPage ? "#ccff00" : "#a1a1a1",
  }}
  className="text-xs font-bold tracking-wider transition hover:text-[#ccff00] sm:text-sm"
>
  Workouts
</Link>

{/* My Plan */}
<Link
  href="/my-plan"
  style={{
    color: isMyPlanPage ? "#ccff00" : "#a1a1a1",
  }}
  className="text-xs font-bold tracking-wider transition hover:text-[#ccff00] sm:text-sm"
>
  My Plan
</Link>

        </div>

  {/* Plan / Saved */}
<div className="flex shrink-0 items-center gap-4">

  {/* Plan */}
  <Link
    href="/my-plan"
    className="flex items-center gap-2 text-xs font-bold tracking-wider sm:text-sm"
  >
    <span className="text-[#a1a1a1]">
      Plan
    </span>

    {/* Plan Number - Initially Active */}
    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold text-black">
      0
    </span>
  </Link>

  {/* Saved */}
  <Link
    href="/my-plan"
    className="flex items-center gap-2 text-xs font-bold tracking-wider sm:text-sm"
  >
    <span className="text-[#a1a1a1]">
      Saved
    </span>

    {/* Saved Number - Initially Normal */}
    <span className="text-[#a1a1a1]">
      0
    </span>
  </Link>

</div>
      </nav>
    </header>
  );
}