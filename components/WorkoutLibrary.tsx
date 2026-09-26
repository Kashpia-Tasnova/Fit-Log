"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
    >

      {/* Section Header */}
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Library
          </h2>

          <p className="mt-3 text-sm text-[#a1a1a1] sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#292929] border-t-[#ccff00]" />

            <p className="text-sm font-medium text-[#a1a1a1]">
              Loading workouts…
            </p>

          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Workout Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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