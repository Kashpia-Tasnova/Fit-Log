
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isWorkoutPage = pathname === "/";
  const isMyPlanPage = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#292929] bg-[#0b0b0b]">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-black tracking-tight text-white sm:text-2xl"
        >
          FIT<span className="text-[#ccff00]">LOG</span>
        </Link>

        {/* Main Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
          <Link
            href="/"
            className={`text-xs font-bold  tracking-wider transition sm:text-sm ${
              isWorkoutPage
                ? "text-[#ccff00]"
                : "text-white hover:text-[#ccff00]"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-xs font-bold  tracking-wider transition sm:text-sm ${
              isMyPlanPage
                ? "text-[#ccff00]"
                : "text-white hover:text-[#ccff00]"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Plan / Saved */}
  
<div className="flex shrink-0 items-center gap-4">

  {/* Plan */}
  <Link
    href="/my-plan"
    className="flex items-center gap-1 text-xs font-bold  tracking-wider text-white sm:text-sm"
  >
    Plan
    <span
      className={
        isMyPlanPage
          ? "flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[10px] font-black text-black"
          : "text-white"
      }
    >
      0
    </span>
  </Link>

  {/* Saved */}
  <Link
    href="/my-plan"
    className="flex items-center gap-1 text-xs font-bold  tracking-wider text-white sm:text-sm"
  >
    Saved
    <span className="text-white">
      0
    </span>
  </Link>

</div>
      </nav>
    </header>
  );
}
