import Navigation from "../global/Navigation";
import Header from "../global/Header";
import type { ReactNode } from "react";
import AsyncBoundary from "../common/AsyncBoundary";

interface MainLayoutProps {
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const MainLayout = ({
  children,
  loading = false,
  error = null,
}: MainLayoutProps) => {
  return (
    <div className="w-full max-w-[1920px] min-h-screen bg-[var(--surface-inverse,#F9FAFB)] flex ">
      <Navigation />
      <div className="flex-1 ml-[300px]">
        <Header />
        <main className="py-[clamp(40px,5vw,70px)] px-[clamp(20px,4vw,62px)] w-full h-full mx-auto overflow-x-hidden">
          {loading || error ? (
            <div className="flex flex-col gap-[clamp(24px,4vw,48px)]">
              <AsyncBoundary loading={loading} error={error}>
                {children}
              </AsyncBoundary>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
