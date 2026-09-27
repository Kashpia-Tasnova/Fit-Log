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

  const isMyPlanPage =
    pathname === "/my-plan";

  /* =========================================
     WORKOUTS NAVIGATION
     ========================================= */

  const handleWorkoutClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      const library =
        document.getElementById("library");

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

  /* =========================================
     HANDLE /#library ON PAGE LOAD
     ========================================= */

  useEffect(() => {
    if (
      pathname === "/" &&
      window.location.hash === "#library"
    ) {
      const library =
        document.getElementById("library");

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

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-8">

        {/* =====================================
            LOGO
            ===================================== */}

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

          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
            FITLOG
          </span>
        </Link>

        {/* =====================================
            MAIN NAVIGATION
            ===================================== */}

        <nav className="flex items-center gap-4 sm:gap-7 lg:gap-8">

          {/* WORKOUTS */}

          <a
            href="/#library"
            onClick={handleWorkoutClick}
            className="text-[11px] font-bold tracking-wider transition sm:text-xs lg:text-sm"
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
            className="text-[11px] font-bold tracking-wider transition sm:text-xs lg:text-sm"
            style={{
              color: isMyPlanPage
                ? "#ccff00"
                : "#a1a1a1",
            }}
          >
            My Plan
          </Link>

        </nav>

        {/* =====================================
            PLAN + SAVED
            ===================================== */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* PLAN */}

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider sm:gap-2 sm:text-xs lg:text-sm"
          >
            <span className="text-[#a1a1a1]">
              Plan
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[10px] font-bold !text-black sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs">
              {plan.length}
            </span>
          </Link>

          {/* SAVED */}

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider sm:gap-2 sm:text-xs lg:text-sm"
          >
            <span className="text-[#a1a1a1]">
              Saved
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#a1a1a1] bg-[#0b0b0b] px-1 text-[10px] font-bold !text-[#a1a1a1] sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs">
              {saved.length}
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
}