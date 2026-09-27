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

  /*
   * ==============================
   * FETCH WORKOUT
   * ==============================
   */
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

  /*
   * ==============================
   * ADD TO PLAN
   * ==============================
   */
  const handleAddToPlan = () => {
    if (!workout) return;

    /*
     * Already exists
     */
    if (isInPlan(workout.id)) {
      setPlanSuccess(false);

      setPlanMessage(
        "Already added to today's plan."
      );
    }

    /*
     * Maximum 5 workouts
     */
    else if (plan.length >= 5) {
      setPlanSuccess(false);

      setPlanMessage(
        "Cannot add more. Today's plan is limited to 5 workouts."
      );
    }

    /*
     * Add workout
     */
    else {
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

  /*
   * ==============================
   * SAVE WORKOUT
   * ==============================
   */
  const handleSave = () => {
    if (!workout) return;

    /*
     * Already saved
     */
    if (isSaved(workout.id)) {
      setSavedSuccess(false);

      setSavedMessage(
        "Already saved for later."
      );
    }

    /*
     * Save workout
     */
    else {
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

  /*
   * ==============================
   * LOADING STATE
   * ==============================
   */
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

  /*
   * ==============================
   * ERROR STATE
   * ==============================
   */
  if (error || !workout) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0b0b] px-6 text-center text-white">
        <p className="text-sm text-[#a1a1a1]">
          {error || "Workout not found."}
        </p>
      </main>
    );
  }

  /*
   * ==============================
   * CURRENT STATUS
   * ==============================
   */
  const alreadyInPlan =
    isInPlan(workout.id);

  const alreadySaved =
    isSaved(workout.id);

  /*
   * ==============================
   * PAGE
   * ==============================
   */
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      <section className="mx-auto w-full max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">

          {/* ==================================
              LEFT SIDE — WORKOUT IMAGE
          =================================== */}
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

          {/* ==================================
              RIGHT SIDE — WORKOUT INFORMATION
          =================================== */}
          <div className="flex min-w-0 flex-col">

            {/* Workout name */}
            <h1 className="text-[34px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[44px]">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[590px] text-sm leading-6 text-[#a1a1a1] sm:text-[15px]">
              {workout.description}
            </p>

            {/* Muscle groups */}
            <div className="mt-5 flex flex-wrap gap-2">

              {workout.muscleGroups.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-semibold text-black"
                  >
                    {muscle}
                  </span>
                )
              )}

            </div>

            {/* ==================================
                KEY SPECS
            =================================== */}
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

            {/* ==================================
                INSTRUCTIONS
            =================================== */}
            <div className="mt-8">

              <h2 className="text-base font-black uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">

                {workout.instructions.map(
                  (instruction, index) => (
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
                  )
                )}

              </ol>
            </div>

            {/* ==================================
                ACTION BUTTONS
            =================================== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* ADD TO PLAN */}
              <button
                type="button"
                onClick={handleAddToPlan}
                className={`inline-flex items-center justify-center gap-2 rounded-[9px] px-6 py-3.5 text-sm font-medium transition ${
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
                    Add to today&apos;s plan
                  </>
                )}

              </button>

              {/* SAVE */}
              <button
                type="button"
                onClick={handleSave}
                className={`inline-flex items-center justify-center gap-2 rounded-[9px] border px-6 py-3.5 text-sm font-medium transition ${
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

      {/* ==================================
          PLAN TOAST
      =================================== */}
      {planMessage && (
        <div className="fixed right-5 top-[88px] z-[100] flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-md bg-[#1a1d24] px-5 py-3 shadow-xl sm:right-8">

          {planSuccess ? (
            <Check className="h-5 w-5 shrink-0 text-[#ccff00]" />
          ) : (
            <X className="h-5 w-5 shrink-0 text-red-400" />
          )}

          <p className="text-sm text-white">
            {planMessage}
          </p>

        </div>
      )}

      {/* ==================================
          SAVED TOAST
      =================================== */}
      {savedMessage && (
        <div className="fixed right-5 top-[88px] z-[100] flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-md bg-[#1a1d24] px-5 py-3 shadow-xl sm:right-8">

          {savedSuccess ? (
            <Check className="h-5 w-5 shrink-0 text-[#ccff00]" />
          ) : (
            <X className="h-5 w-5 shrink-0 text-red-400" />
          )}

          <p className="text-sm text-white">
            {savedMessage}
          </p>

        </div>
      )}

    </main>
  );
}