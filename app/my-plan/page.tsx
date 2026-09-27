"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import { useFitLog } from "@/context/FitLogContext";

type Tab = "plan" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  /* =========================================
     ACTIVE TAB
     ========================================= */

  const searchParams = useSearchParams();

  const activeTab: Tab =
    searchParams.get("tab") === "saved"
      ? "saved"
      : "plan";

  /* =========================================
     SORTING
     ========================================= */

  /*
   * null means:
   * Do not sort.
   * Keep the original added order.
   */

  const [sortBy, setSortBy] =
    useState<SortOption | null>(null);

  /* =========================================
     COMPLETED WORKOUTS
     ========================================= */

  const [completed, setCompleted] =
    useState<number[]>([]);

  /* =========================================
     TOAST
     ========================================= */

  const [toast, setToast] = useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast(message);
    setToastType(type);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================================
     WORKOUT LIST + SORTING
     ========================================= */

  const currentWorkouts = useMemo(() => {
    /*
     * First copy the workouts.
     *
     * If no sort option is selected,
     * this array keeps the exact order
     * in which workouts were added.
     */

    const workouts =
      activeTab === "plan"
        ? [...plan]
        : [...saved];

    /*
     * DURATION
     *
     * Ascending:
     * shortest → longest
     */

    if (sortBy === "duration") {
      workouts.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    /*
     * CALORIES
     *
     * Ascending:
     * lowest → highest
     */

    if (sortBy === "calories") {
      workouts.sort(
        (a, b) =>
          a.caloriesBurned -
          b.caloriesBurned
      );
    }

    /*
     * RATING
     *
     * Ascending:
     * lowest → highest
     */

    if (sortBy === "rating") {
      workouts.sort(
        (a, b) =>
          a.rating - b.rating
      );
    }

    return workouts;
  }, [
    activeTab,
    plan,
    saved,
    sortBy,
  ]);

  /* =========================================
     METRICS
     ========================================= */

  /*
   * Metrics always use the actual
   * Plan/Saved list, not the sorted copy.
   */

  const displayedWorkouts =
    activeTab === "plan"
      ? plan
      : saved;

  const totalMinutes =
    displayedWorkouts.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );

  const totalCalories =
    displayedWorkouts.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );

  /* =========================================
     MARK AS DONE
     ========================================= */

  const handleDone = (
    workoutId: number
  ) => {
    setCompleted((current) => {
      /*
       * If already completed,
       * clicking again will undo it.
       */

      if (current.includes(workoutId)) {
        return current.filter(
          (id) => id !== workoutId
        );
      }

      return [
        ...current,
        workoutId,
      ];
    });

    showToast(
      "Workout status updated."
    );
  };

  /* =========================================
     REMOVE FROM PLAN
     ========================================= */

  const handleRemovePlan = (
    workoutId: number
  ) => {
    removeFromPlan(workoutId);

    /*
     * Also remove it from completed
     * if it was marked as done.
     */

    setCompleted((current) =>
      current.filter(
        (id) => id !== workoutId
      )
    );

    showToast(
      "Workout removed from today's plan.",
      "error"
    );
  };

  /* =========================================
     REMOVE FROM SAVED
     ========================================= */

  const handleRemoveSaved = (
    workoutId: number
  ) => {
    removeFromSaved(workoutId);

    showToast(
      "Workout removed from saved.",
      "error"
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto w-full max-w-[1184px] px-6 pb-20 pt-11 sm:px-8 lg:px-0">

        {/* =====================================
            PAGE HEADER
            ===================================== */}

        <div>
          <h1 className="text-[28px] font-black uppercase leading-none tracking-[-0.02em] sm:text-[30px]">
            My Plan
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#9ca3af]">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* =====================================
            METRICS
            ===================================== */}

        <div className="mt-6 flex min-h-[122px] w-full items-center rounded-[15px] border border-[#29303b] bg-[#14171d] px-6 sm:px-8">

          {/* EXERCISES */}

          <div className="flex flex-1 flex-col justify-center">

            <span className="text-[12px] text-[#8f96a3]">
              Exercises
            </span>

            <span className="mt-2 text-[40px] font-black leading-none text-[#ccff00]">
              {displayedWorkouts.length}
            </span>

          </div>

          <div className="h-[60px] w-px bg-[#252a33]" />

          {/* MINUTES */}

          <div className="flex flex-1 flex-col justify-center pl-6 sm:pl-8">

            <span className="text-[12px] text-[#8f96a3]">
              Minutes
            </span>

            <span className="mt-2 text-[40px] font-black leading-none text-white">
              {totalMinutes}
            </span>

          </div>

          <div className="h-[60px] w-px bg-[#252a33]" />

          {/* CALORIES */}

          <div className="flex flex-1 flex-col justify-center pl-6 sm:pl-8">

            <span className="text-[12px] text-[#8f96a3]">
              Calories
            </span>

            <span className="mt-2 text-[40px] font-black leading-none text-white">
              {totalCalories}
            </span>

          </div>

        </div>

        {/* =====================================
            TABS + SORT
            ===================================== */}

        <div className="mt-8 flex items-center justify-between gap-4">

          {/* ===================================
              PLAN / SAVED TABS
              =================================== */}

          <div className="flex h-[40px] items-center rounded-[8px] border border-[#29303b] bg-[#14171d] p-[3px]">

            {/* TODAY'S PLAN */}

            <Link
              href="/my-plan"
              style={{
                color:
                  activeTab === "plan"
                    ? "#ccff00"
                    : "#8f96a3",
              }}
              className="flex h-full items-center rounded-[6px] px-5 text-[12px] font-semibold transition-colors hover:text-[#ccff00]"
            >
              Today&apos;s Plan
            </Link>

            {/* SAVED */}

            <Link
              href="/my-plan?tab=saved"
              style={{
                color:
                  activeTab === "saved"
                    ? "#ccff00"
                    : "#8f96a3",
              }}
              className="flex h-full items-center rounded-[6px] px-5 text-[12px] font-semibold transition-colors hover:text-[#ccff00]"
            >
              Saved
            </Link>

          </div>

          {/* ===================================
              SORT DROPDOWN
              =================================== */}

          <div className="flex items-center gap-2">

            <span className="hidden text-[12px] font-medium text-[#a1a1a1] sm:block">
              Sort By
            </span>

            <div className="relative">

              <select
                value={sortBy ?? ""}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!value) {
                    setSortBy(null);
                    return;
                  }

                  setSortBy(
                    value as SortOption
                  );
                }}
                className="h-[36px] appearance-none rounded-[8px] border border-[#29303b] bg-[#14171d] pl-3 pr-9 text-[12px] text-white outline-none transition hover:border-[#3b4350] focus:border-[#ccff00]"
              >

                {/* DEFAULT */}

                <option value="">
                  Sort By
                </option>

                {/* OPTIONS */}

                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>

              </select>

              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8f96a3]"
              />

            </div>

          </div>

        </div>

        {/* =====================================
            EMPTY STATE
            ===================================== */}

        {currentWorkouts.length === 0 && (
          <div className="mt-6 flex min-h-[240px] flex-col items-center justify-center rounded-[14px] border border-dashed border-[#29303b] bg-[#14171d] px-6 text-center">

            <h2 className="text-lg font-bold uppercase">
              {activeTab === "plan"
                ? "Your plan is empty"
                : "Nothing saved yet"}
            </h2>

            <p className="mt-2 max-w-md text-[13px] leading-5 text-[#8f96a3]">
              Browse the library and add a lift to
              get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-5 inline-flex rounded-full bg-[#ccff00] px-6 py-2.5 text-[11px] font-bold uppercase !text-black transition hover:bg-[#bfff00]"
            >
              Go to workouts
            </Link>

          </div>
        )}

        {/* =====================================
            WORKOUT LIST
            ===================================== */}

        {currentWorkouts.length > 0 && (
          <div className="mt-6 space-y-4">

            {currentWorkouts.map(
              (workout) => {

                const isCompleted =
                  completed.includes(
                    workout.id
                  );

                return (
                  <div
                    key={workout.id}
                    className={`flex min-h-[112px] items-center rounded-[15px] border bg-[#14171d] px-4 py-4 transition sm:px-4 ${
                      isCompleted
                        ? "border-[#39411f]"
                        : "border-[#29303b]"
                    }`}
                  >

                    {/* =================================
                        WORKOUT IMAGE
                        ================================= */}

                    <div className="relative h-[80px] w-[145px] shrink-0 overflow-hidden rounded-[10px] bg-[#20242b]">

                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className={`object-cover ${
                          isCompleted
                            ? "grayscale"
                            : ""
                        }`}
                        sizes="145px"
                      />

                    </div>

                    {/* =================================
                        WORKOUT INFORMATION
                        ================================= */}

                    <div className="ml-4 min-w-0 flex-1">

                      <h2
                        className={`truncate text-[16px] font-black uppercase leading-none ${
                          isCompleted
                            ? "text-[#777777] line-through"
                            : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h2>

                      <p className="mt-1.5 truncate text-[12px] text-[#8f96a3]">
                        {workout.equipment}
                      </p>

                      {/* STATS */}

                      <div className="mt-3 flex items-center gap-4">

                        {/* DURATION */}

                        <div className="flex items-center gap-1.5">

                          <Clock3 className="h-[14px] w-[14px] text-[#ccff00]" />

                          <span className="text-[11px] text-[#c1c5cc]">
                            {workout.duration} min
                          </span>

                        </div>

                        {/* CALORIES */}

                        <div className="flex items-center gap-1.5">

                          <Flame className="h-[14px] w-[14px] text-[#ccff00]" />

                          <span className="text-[11px] text-[#c1c5cc]">
                            {workout.caloriesBurned} kcal
                          </span>

                        </div>

                        {/* RATING */}

                        <div className="flex items-center gap-1.5">

                          <Star className="h-[14px] w-[14px] text-[#ccff00]" />

                          <span className="text-[11px] text-[#c1c5cc]">
                            {workout.rating}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* =================================
                        ACTION BUTTONS
                        ================================= */}

                    <div className="ml-4 flex shrink-0 items-center gap-3">

                      {/* VIEW DETAILS */}

                      <Link
                        href={`/workout/${workout.id}`}
                        className="hidden h-[35px] items-center justify-center rounded-full border border-[#39414d] px-5 text-[11px] font-medium text-[#e5e7eb] transition hover:border-[#ccff00] hover:text-[#ccff00] sm:flex"
                      >
                        View Details
                      </Link>

                      {/* MARK AS DONE */}

                      {activeTab === "plan" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDone(
                              workout.id
                            )
                          }
                          className={`flex h-[35px] items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold transition ${
                            isCompleted
                              ? "bg-[#292d34] text-[#9ca3af]"
                              : "bg-[#ccff00] text-black hover:bg-[#bfff00]"
                          }`}
                        >

                          <Check className="h-[13px] w-[13px]" />

                          <span className="hidden sm:inline">
                            {isCompleted
                              ? "Done"
                              : "Mark as Done"}
                          </span>

                        </button>
                      )}

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          activeTab === "plan"
                            ? handleRemovePlan(
                                workout.id
                              )
                            : handleRemoveSaved(
                                workout.id
                              )
                        }
                        aria-label="Remove workout"
                        className="flex h-8 w-8 items-center justify-center text-[#6f7784] transition hover:text-red-400"
                      >
                        <X className="h-[18px] w-[18px]" />
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </section>

      {/* =====================================
          TOAST MESSAGE
          ===================================== */}

      {toast && (
        <div className="fixed right-5 top-[88px] z-[100] flex items-center gap-3 rounded-[8px] border border-[#29303b] bg-[#181b21] px-5 py-3 shadow-2xl sm:right-8">

          {toastType === "success" ? (
            <Check className="h-4 w-4 text-[#ccff00]" />
          ) : (
            <X className="h-4 w-4 text-red-400" />
          )}

          <p className="text-[12px] text-white">
            {toast}
          </p>

        </div>
      )}

    </main>
  );
}