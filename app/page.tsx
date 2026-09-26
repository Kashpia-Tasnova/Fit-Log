import Image from "next/image";
import bannerImage from "../assets/banner.png";

export default function Home() {
  return (
    <main className="bg-[#0b0b0b] text-white">

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12 lg:px-8">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Hero Content */}
          <div className="max-w-xl">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00] sm:text-sm">
              Workout Library
            </p>

            <h1 className="text-2xl font-black uppercase leading-[1] tracking-tight sm:text-5xl lg:text-6xl">
              Train With Intent. Log Every Set.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-[#a1a1a1] sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

           <a
  href="#library"
  className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wide !text-black sm:px-6 sm:py-3.5 sm:text-sm"
>
  Browse Workouts
 
</a>
          </div>

          {/* Hero Image */}
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-[#292929] lg:max-w-lg">
            <Image
              src={bannerImage}
              alt="FitLog workout banner"
              priority
              className="h-auto w-full object-cover"
            />
          </div>

        </div>

      </section>

    
    </main>
  );
}