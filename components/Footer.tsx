import Image from "next/image";
import logoImage from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#292929] bg-[#0b0b0b]">

      <div className="mx-auto flex min-h-24 w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 sm:py-6 lg:px-8">

        {/* =====================================
            LOGO
            ===================================== */}

        <div className="flex shrink-0 items-center gap-2">

          <Image
            src={logoImage}
            alt="FitLog Logo"
            width={22}
            height={22}
            className="h-5 w-5 object-contain"
          />

          <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
            FITLOG
          </span>

        </div>

        {/* =====================================
            COPYRIGHT
            ===================================== */}

        <p className="text-center text-[10px] leading-5 text-[#a1a1a1] sm:text-right sm:text-xs lg:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>

    </footer>
  );
}