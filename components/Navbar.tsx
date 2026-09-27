"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import logoImage from "../assets/logo.png";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { plan, saved } = useFitLog();

  const isWorkoutPage =
    pathname === "/" || pathname.startsWith("/workout/");

  const isMyPlanPage = pathname === "/my-plan";

  const handleWorkoutClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
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

  useEffect(() => {
    if (
      pathname === "/" &&
      window.location.hash === "#library"
    ) {
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
    <header className="sticky top-0 z-50 border-b border-[#222222] bg-[#0b0b0b]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">

        {/* LOGO */}
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

        {/* MAIN NAVIGATION */}
        <nav className="flex items-center gap-5 sm:gap-8">

          {/* WORKOUTS */}
          <a
            href="/#library"
            onClick={handleWorkoutClick}
            className="text-xs font-bold tracking-wider transition sm:text-sm"
            style={{
              color: isWorkoutPage
                ? "#ccff00"
                : "#a1a1a1",
            }}
          >
            Workouts
          </a>

          {/* MY PLAN */}
          <Link
            href="/my-plan"
            className="text-xs font-bold tracking-wider transition sm:text-sm"
            style={{
              color: isMyPlanPage
                ? "#ccff00"
                : "#a1a1a1",
            }}
          >
            My Plan
          </Link>

        </nav>

        {/* PLAN + SAVED */}
        <div className="flex shrink-0 items-center gap-4">

          {/* PLAN */}

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold tracking-wider sm:text-sm"
          >
            <span className="text-[#a1a1a1]">
              Plan
            </span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-xs font-bold !text-black">
              {plan.length}
            </span>
          </Link>

          {/* SAVED */}

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-xs font-bold tracking-wider sm:text-sm"
          >
            <span className="text-[#a1a1a1]">
              Saved
            </span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#a1a1a1] bg-[#0b0b0b] px-1.5 text-xs font-bold !text-[#a1a1a1]">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}