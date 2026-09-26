import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#292929] bg-[#151515] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >
      {/* Workout Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Workout Information */}
      <div className="p-5">

        {/* Muscle Groups */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-lg font-black uppercase leading-tight tracking-wide text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-[#a1a1a1]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-[#292929] pt-4">

          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-[#a1a1a1]" />

            <span className="text-xs font-medium text-[#a1a1a1]">
              {workout.duration} min
            </span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-[#a1a1a1]" />

            <span className="text-xs font-medium text-[#a1a1a1]">
              {workout.caloriesBurned} kcal
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-[#a1a1a1]" />

            <span className="text-xs font-medium text-[#a1a1a1]">
              {workout.rating}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}