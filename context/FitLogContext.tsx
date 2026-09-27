"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/types/workout";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;

  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;

  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export function FitLogProvider({
  children,
}: {
  children: ReactNode;
}) {
  // IMPORTANT:
  // Always start with empty arrays.
  // This makes server and client render the same HTML.
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  // ============================================================
  // LOAD DATA FROM LOCAL STORAGE AFTER CLIENT MOUNTS
  // ============================================================

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data from localStorage:",
        error
      );
    }
  }, []);

  // ============================================================
  // ADD TO TODAY'S PLAN
  // ============================================================

  const addToPlan = (workout: Workout) => {
  const alreadyExists = plan.some(
    (item) => item.id === workout.id
  );

  // Do not add the same workout twice
  if (alreadyExists) {
    return false;
  }

  // Maximum 5 workouts allowed
  if (plan.length >= 5) {
    return false;
  }

  const updatedPlan = [...plan, workout];

  setPlan(updatedPlan);

  localStorage.setItem(
    "fitlog-plan",
    JSON.stringify(updatedPlan)
  );

  return true;
};

  // ============================================================
  // REMOVE FROM TODAY'S PLAN
  // ============================================================

  const removeFromPlan = (workoutId: number) => {
    const updatedPlan = plan.filter(
      (item) => item.id !== workoutId
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );
  };

  // ============================================================
  // SAVE FOR LATER
  // ============================================================

  const saveWorkout = (workout: Workout) => {
    const alreadyExists = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      return false;
    }

    const updatedSaved = [...saved, workout];

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    return true;
  };

  // ============================================================
  // REMOVE FROM SAVED
  // ============================================================

  const removeFromSaved = (workoutId: number) => {
    const updatedSaved = saved.filter(
      (item) => item.id !== workoutId
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );
  };

  // ============================================================
  // CHECK IF IN PLAN
  // ============================================================

  const isInPlan = (workoutId: number) => {
    return plan.some(
      (item) => item.id === workoutId
    );
  };

  // ============================================================
  // CHECK IF SAVED
  // ============================================================

  const isSaved = (workoutId: number) => {
    return saved.some(
      (item) => item.id === workoutId
    );
  };

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,

        addToPlan,
        removeFromPlan,

        saveWorkout,
        removeFromSaved,

        isInPlan,
        isSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

// ============================================================
// CUSTOM HOOK
// ============================================================

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}