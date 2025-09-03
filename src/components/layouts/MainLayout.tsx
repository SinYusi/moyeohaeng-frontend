import Navigation from "../global/Navigation";
import Header from "../global/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

import { useState } from "react";

export default function MainLayout({ children }: MainLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-inverse,#F9FAFB)] flex">
      <Navigation
        isCollapsed={isNavCollapsed}
        onToggle={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isNavCollapsed ? "ml-[80px]" : "ml-[300px]"
        }`}
      >
        <Header />
        <main className="py-[clamp(40px,5vw,70px)] px-[clamp(20px,4vw,62px)] w-full max-w-[1920px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
