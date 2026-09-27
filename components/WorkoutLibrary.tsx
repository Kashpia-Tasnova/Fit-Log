"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* FETCH WORKOUTS */

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch workouts"
          );
        }

        const data: Workout[] =
          await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load workouts. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >

      {/* SECTION HEADER */}

      <div className="mb-8 sm:mb-10 lg:mb-14">

        <div className="max-w-2xl">

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ccff00] sm:text-xs">
            Workout Library
          </p>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Library
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#a1a1a1] sm:text-base">
            Twelve lifts covering every major
            muscle group.
          </p>

        </div>

      </div>

      {/*  LOADING */}

      {loading && (
        <div className="flex min-h-[260px] items-center justify-center sm:min-h-[300px]">

          <div className="flex flex-col items-center gap-4">

            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#292929] border-t-[#ccff00] sm:h-10 sm:w-10" />

            <p className="text-xs font-medium text-[#a1a1a1] sm:text-sm">
              Loading workouts…
            </p>

          </div>

        </div>
      )}

      {/* ERROR  */}

      {!loading && error && (
        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-[#292929] bg-[#151515] px-5 text-center sm:min-h-[250px]">

          <p className="text-xs leading-5 text-red-400 sm:text-sm">
            {error}
          </p>

        </div>
      )}

      {/* WORKOUT GRID*/}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">

          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}

        </div>
      )}

    </section>
  );
}