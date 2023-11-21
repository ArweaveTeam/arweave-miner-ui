import React from "react";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <section className="min-h-screen w-full bg-[#F1F1F1]">
      <Navbar />
      {children}
    </section>
  );
}
