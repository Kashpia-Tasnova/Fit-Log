"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Bookmark,
  CalendarPlus,
  Check,
} from "lucide-react";

import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [planMessage, setPlanMessage] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        setError("");

        const { id } = await params;

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load this workout.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [params]);

  const handleAddToPlan = () => {
    if (!workout) return;

    addToPlan(workout);
    setPlanMessage(true);

    setTimeout(() => {
      setPlanMessage(false);
    }, 2500);
  };

  const handleSave = () => {
    if (!workout) return;

    saveWorkout(workout);
    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  };

  if (loading) {
    return (
      <main className="min-h-[80vh] bg-[#0b0b0b] text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#292929] border-t-[#ccff00]" />

            <p className="text-sm text-[#a1a1a1]">
              Loading workout...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0b0b] px-6 text-center text-white">
        <p className="text-sm text-[#a1a1a1]">
          {error || "Workout not found."}
        </p>
      </main>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* =========================================================
          WORKOUT DETAILS
      ========================================================= */}
      <section className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">

          {/* =====================================================
              LEFT — WORKOUT IMAGE
          ===================================================== */}
          <div className="relative w-full overflow-hidden rounded-[16px] bg-[#151515]">

            <div className="relative aspect-[4/5] w-full">

              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

            </div>

          </div>

          {/* =====================================================
              RIGHT — WORKOUT INFORMATION
          ===================================================== */}
          <div className="flex min-w-0 flex-col">

            {/* Workout Name */}
            <h1 className="font-black uppercase leading-[0.95] tracking-[-0.02em] text-white text-[34px] sm:text-[42px] lg:text-[44px]">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[590px] text-sm leading-6 text-[#a1a1a1] sm:text-[15px]">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-semibold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* =================================================
                WORKOUT SPECIFICATIONS
            ================================================= */}
            <div className="mt-7 overflow-hidden rounded-[15px] border border-[#272d38] bg-[#151820]">

              {/* Equipment */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Equipment
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.equipment}
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Difficulty
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Sets
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.sets}
                </span>
              </div>

              {/* Reps */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Reps
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.reps}
                </span>
              </div>

              {/* Duration */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Duration
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex min-h-[49px] items-center justify-between border-b border-[#272d38] px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Calories
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              {/* Rating */}
              <div className="flex min-h-[49px] items-center justify-between px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#9ca3af]">
                  Rating
                </span>

                <span className="text-sm text-[#e5e7eb]">
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* =================================================
                INSTRUCTIONS
            ================================================= */}
            <div className="mt-8">

              <h2 className="text-base font-black uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-5 text-[#d1d5db]"
                  >
                    <span className="shrink-0 font-medium text-white">
                      {index + 1}.
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* Add to Plan */}
              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={alreadyInPlan}
                className={`inline-flex items-center justify-center gap-2 rounded-[9px] px-6 py-3.5 text-sm font-medium transition ${
                  alreadyInPlan
                    ? "cursor-not-allowed bg-[#292929] text-[#777777]"
                    : "bg-[#ccff00] text-black hover:bg-[#bfff00]"
                }`}
              >
                {alreadyInPlan ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to plan
                  </>
                ) : (
                  <>
                    <CalendarPlus className="h-4 w-4" />
                    Add to today&apos;s plan
                  </>
                )}
              </button>

              {/* Save */}
              <button
                type="button"
                onClick={handleSave}
                disabled={alreadySaved}
                className={`inline-flex items-center justify-center gap-2 rounded-[9px] border px-6 py-3.5 text-sm font-medium transition ${
                  alreadySaved
                    ? "cursor-not-allowed border-[#303642] text-[#777777]"
                    : "border-[#39404d] text-[#e5e7eb] hover:border-[#ccff00] hover:text-[#ccff00]"
                }`}
              >
                {alreadySaved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Save for later
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          TOASTS
      ========================================================= */}

      {planMessage && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-[#ccff00] bg-[#151820] px-5 py-3 text-sm text-white shadow-xl">
          Added to today&apos;s plan.
        </div>
      )}

      {savedMessage && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-[#ccff00] bg-[#151820] px-5 py-3 text-sm text-white shadow-xl">
          Saved for later.
        </div>
      )}

    </main>
  );
}