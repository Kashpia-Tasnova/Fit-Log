"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Bookmark,
  CalendarPlus,
  Check,
  X,
} from "lucide-react";

import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const [workout, setWorkout] =
    useState<Workout | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  // Plan toast
  const [planMessage, setPlanMessage] =
    useState("");

  const [planSuccess, setPlanSuccess] =
    useState(false);

  // Saved toast
  const [savedMessage, setSavedMessage] =
    useState("");

  const [savedSuccess, setSavedSuccess] =
    useState(false);

  const {
    plan,
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  /* ==================================
     FETCH WORKOUT
  ================================== */

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        setError("");

        const { id } = await params;

        const response = await fetch(
          `${API_URL}/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch workout"
          );
        }

        const data: Workout =
          await response.json();

        setWorkout(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load this workout."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [params]);

  /*  ADD TO PLAN */

  const handleAddToPlan = () => {
    if (!workout) return;

    if (isInPlan(workout.id)) {
      setPlanSuccess(false);

      setPlanMessage(
        "Already added to today's plan."
      );
    } else if (plan.length >= 5) {
      setPlanSuccess(false);

      setPlanMessage(
        "Cannot add more. Today's plan is limited to 5 workouts."
      );
    } else {
      const added = addToPlan(workout);

      if (added) {
        setPlanSuccess(true);

        setPlanMessage(
          "Added to today's plan."
        );
      } else {
        setPlanSuccess(false);

        setPlanMessage(
          "Unable to add this workout to your plan."
        );
      }
    }

    setTimeout(() => {
      setPlanMessage("");
    }, 2500);
  };

  /* SAVE WORKOUT */

  const handleSave = () => {
    if (!workout) return;

    if (isSaved(workout.id)) {
      setSavedSuccess(false);

      setSavedMessage(
        "Already saved for later."
      );
    } else {
      const saved = saveWorkout(workout);

      if (saved) {
        setSavedSuccess(true);

        setSavedMessage(
          "Saved for later."
        );
      } else {
        setSavedSuccess(false);

        setSavedMessage(
          "Unable to save this workout."
        );
      }
    }

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  /*   LOADING STATE */

  if (loading) {
    return (
      <main className="min-h-[80vh] bg-[#0b0b0b] text-white">
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#292929] border-t-[#ccff00] sm:h-10 sm:w-10" />

            <p className="text-xs text-[#a1a1a1] sm:text-sm">
              Loading workout...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* ==================================
     ERROR STATE
  ================================== */

  if (error || !workout) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0b0b] px-5 text-center text-white sm:px-6">
        <p className="max-w-md text-xs leading-5 text-[#a1a1a1] sm:text-sm">
          {error || "Workout not found."}
        </p>
      </main>
    );
  }

  /* ==================================
     CURRENT STATUS
  ================================== */

  const alreadyInPlan =
    isInPlan(workout.id);

  const alreadySaved =
    isSaved(workout.id);

  /* ==================================
     PAGE
  ================================== */

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

          {/* ==================================
              LEFT SIDE — WORKOUT IMAGE
          ================================== */}

          <div className="w-full overflow-hidden rounded-xl bg-[#151515] lg:sticky lg:top-28">

            <div className="relative aspect-[4/5] w-full">

              <Image src={workout.image} alt={workout.name} fill priority className="object-cover"sizes="(max-width: 1024px) 100vw, 50vw" />

            </div>

          </div>

          {/* ==================================
              RIGHT SIDE — WORKOUT INFORMATION
          ================================== */}

          <div className="flex min-w-0 flex-col">

            {/* WORKOUT NAME */}

            <h1 className="text-3xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-4xl lg:text-[44px]">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a1a1a1] sm:text-[15px] sm:leading-7">
              {workout.description}
            </p>

            {/* MUSCLE GROUPS */}

            <div className="mt-5 flex flex-wrap gap-2">

              {workout.muscleGroups.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-black sm:px-4 sm:text-xs"
                  >
                    {muscle}
                  </span>
                )
              )}

            </div>

            {/* ==================================
                KEY SPECS
            ================================== */}

            <div className="mt-7 overflow-hidden rounded-xl border border-[#272d38] bg-[#151820]">

              {/* EQUIPMENT */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Equipment
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.equipment}
                </span>

              </div>

              {/* DIFFICULTY */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Difficulty
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.difficulty}
                </span>

              </div>

              {/* SETS */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Sets
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.sets}
                </span>

              </div>

              {/* REPS */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Reps
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.reps}
                </span>

              </div>

              {/* DURATION */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Duration
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.duration} min
                </span>

              </div>

              {/* CALORIES */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 border-b border-[#272d38] px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Calories
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.caloriesBurned} kcal
                </span>

              </div>

              {/* RATING */}

              <div className="flex min-h-[52px] items-center justify-between gap-4 px-4 py-3 sm:px-6">

                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] sm:text-[11px]">
                  Rating
                </span>

                <span className="text-right text-xs text-[#e5e7eb] sm:text-sm">
                  {workout.rating}
                </span>

              </div>

            </div>

            {/* INSTRUCTIONS */}

            <div className="mt-8">

              <h2 className="text-base font-black uppercase tracking-wide text-white sm:text-lg">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">

                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-xs leading-6 text-[#d1d5db] sm:text-sm"
                    >

                      <span className="shrink-0 font-bold text-[#ccff00]">
                        {index + 1}.
                      </span>

                      <span className="min-w-0">
                        {instruction}
                      </span>

                    </li>
                  )
                )}

              </ol>

            </div>

            {/* ACTION BUTTONS */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* ADD TO PLAN */}

              <button
                type="button"
                onClick={handleAddToPlan}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                  alreadyInPlan
                    ? "bg-[#292929] text-[#a1a1a1]"
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
                    Add to today's plan
                  </>
                )}
              </button>

              {/* SAVE */}

              <button
                type="button"
                onClick={handleSave}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                  alreadySaved
                    ? "border-[#303642] text-[#777777]"
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

      {/*   PLAN TOAST*/}

      {planMessage && (
        <div className="fixed right-3 top-[88px] z-[100] flex max-w-[calc(100vw-24px)] items-center gap-3 rounded-lg bg-[#1a1d24] px-4 py-3 shadow-xl sm:right-6 sm:max-w-md sm:px-5">

          {planSuccess ? (
            <Check className="h-5 w-5 shrink-0 text-[#ccff00]" />
          ) : (
            <X className="h-5 w-5 shrink-0 text-red-400" />
          )}

          <p className="text-xs leading-5 text-white sm:text-sm">
            {planMessage}
          </p>

        </div>
      )}

      {/*    SAVED TOAST */}

      {savedMessage && (
        <div className="fixed right-3 top-[88px] z-[100] flex max-w-[calc(100vw-24px)] items-center gap-3 rounded-lg bg-[#1a1d24] px-4 py-3 shadow-xl sm:right-6 sm:max-w-md sm:px-5">

          {savedSuccess ? (
            <Check className="h-5 w-5 shrink-0 text-[#ccff00]" />
          ) : (
            <X className="h-5 w-5 shrink-0 text-red-400" />
          )}

          <p className="text-xs leading-5 text-white sm:text-sm">
            {savedMessage}
          </p>

        </div>
      )}

    </main>
  );
}