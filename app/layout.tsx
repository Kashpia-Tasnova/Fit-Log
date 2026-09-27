import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <FitLogProvider>
            {/* Navbar  */}
          <Navbar />
           
           {/* page content*/}
          <main className="flex-1">
            {children}
          </main>
          
          {/* footer  */}

          <Footer />

        </FitLogProvider>
      </body>
    </html>
  );
}