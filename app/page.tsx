import Image from "next/image";
import bannerImage from "../assets/banner.png";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="bg-[#0b0b0b] text-white">

      {/* =====================================
          HERO SECTION
          ===================================== */}

      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-12">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

          {/* =================================
              HERO CONTENT
              ================================= */}

          <div className="max-w-xl">

            {/* Eyebrow */}

            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ccff00] sm:text-xs lg:text-sm">
              Workout Library
            </p>

            {/* Heading */}

            <h1 className="text-[34px] font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
              Train With Intent. Log Every Set.
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-lg text-sm leading-6 text-[#a1a1a1] sm:text-base sm:leading-7">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today's plan,
              and watch the week's work add up.
            </p>

            {/* CTA */}

            <a
              href="#library"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wide !text-black transition duration-200 hover:bg-[#bfff00] sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Browse Workouts
            </a>

          </div>

          {/* =================================
              HERO IMAGE
              ================================= */}

          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl lg:max-w-lg">

            <Image
              src={bannerImage}
              alt="FitLog workout banner"
              priority
              className="h-auto w-full object-cover"
            />

          </div>

        </div>

      </section>

      {/* =====================================
          WORKOUT LIBRARY
          ===================================== */}

      <WorkoutLibrary />

    </main>
  );
}