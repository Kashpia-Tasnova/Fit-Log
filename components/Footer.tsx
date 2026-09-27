import Image from "next/image";
import logoImage from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#292929] bg-[#0b0b0b]">
      <div className="mx-auto flex min-h-24 w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 sm:px-8 lg:px-10">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logoImage} alt="FitLog Logo" width={22} height={22} className="h-5 w-5 object-contain" />

          <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-right text-xs text-[#a1a1a1] sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard,log honest.
        </p>

      </div>
    </footer>
  );
}