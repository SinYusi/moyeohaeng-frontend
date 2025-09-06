import React from "react";

interface DashboardLayoutProps {
  headerLeft: React.ReactNode;
  headerRight?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  children: React.ReactNode;
}

/**
 * A simple layout for dashboard pages that unifies header and body structure.
 * - headerLeft: typically the title/subtitle block
 * - headerRight: typically an action button
 * - children: page body content
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  headerLeft,
  headerRight,
  className = "w-full h-full flex flex-col gap-6",
  headerClassName = "flex justify-between items-center",
  children,
}) => {
  return (
    <div className={className}>
      <div className={headerClassName}>
        <div>{headerLeft}</div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
