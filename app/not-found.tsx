export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0b0b] px-6 text-center text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          404 Error
        </p>

        <h1 className="mt-3 text-5xl font-black uppercase sm:text-6xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#a1a1a1]">
          The page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="mt-7 inline-flex rounded-md bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#bfff00]"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}