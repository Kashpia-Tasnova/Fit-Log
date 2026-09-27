import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#292929] bg-[#151515] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >

      {/* =====================================
          WORKOUT IMAGE
          ===================================== */}

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">

        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

      </div>

      {/* =====================================
          WORKOUT INFORMATION
          ===================================== */}

      <div className="p-4 sm:p-5">

        {/* ===================================
            MUSCLE GROUPS
            =================================== */}

        <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">

          {workout.muscleGroups.map(
            (muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black sm:px-3 sm:text-[10px]"
              >
                {muscle}
              </span>
            )
          )}

        </div>

        {/* ===================================
            WORKOUT NAME
            =================================== */}

        <h3 className="text-base font-black uppercase leading-tight tracking-wide text-white sm:text-lg">
          {workout.name}
        </h3>

        {/* ===================================
            EQUIPMENT
            =================================== */}

        <p className="mt-1.5 text-xs text-[#a1a1a1] sm:mt-2 sm:text-sm">
          {workout.equipment}
        </p>

        {/* ===================================
            STATS
            =================================== */}

        <div className="mt-4 flex items-center justify-between border-t border-[#292929] pt-3 sm:mt-5 sm:pt-4">

          {/* DURATION */}

          <div className="flex items-center gap-1 sm:gap-1.5">

            <Clock3 className="h-3.5 w-3.5 text-[#a1a1a1] sm:h-4 sm:w-4" />

            <span className="text-[10px] font-medium text-[#a1a1a1] sm:text-xs">
              {workout.duration} min
            </span>

          </div>

          {/* CALORIES */}

          <div className="flex items-center gap-1 sm:gap-1.5">

            <Flame className="h-3.5 w-3.5 text-[#a1a1a1] sm:h-4 sm:w-4" />

            <span className="text-[10px] font-medium text-[#a1a1a1] sm:text-xs">
              {workout.caloriesBurned} kcal
            </span>

          </div>

          {/* RATING */}

          <div className="flex items-center gap-1 sm:gap-1.5">

            <Star className="h-3.5 w-3.5 text-[#a1a1a1] sm:h-4 sm:w-4" />

            <span className="text-[10px] font-medium text-[#a1a1a1] sm:text-xs">
              {workout.rating}
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}