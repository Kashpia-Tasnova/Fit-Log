import { Suspense } from "react";
import MyPlanContent from "./MyPlanContent";

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white">
          <section className="mx-auto w-full max-w-[1184px] px-4 pb-20 pt-8 sm:px-6 sm:pt-10 md:px-8 lg:px-0 lg:pt-11">
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-[#8f96a3]">
                Loading My Plan...
              </p>
            </div>
          </section>
        </main>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}