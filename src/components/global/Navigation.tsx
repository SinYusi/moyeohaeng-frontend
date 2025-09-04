import { Home, LayoutGrid, LogOut, Folder, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { mockProjects } from "../../mockData";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  showBorder?: boolean;
}

interface NavigationProps {}

const Navigation = ({}: NavigationProps) => {
  const NavItem = ({ icon, label, to }: NavItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer transition-colors ${
          isActive
            ? "bg-[var(--fill-minimal,#EDF0F3)]"
            : "hover:bg-[var(--fill-minimal,#EDF0F3)]"
        }`}
      >
        <div
          className={`${
            isActive
              ? "text-[var(--fill-primary-default,#4F5FBF)]"
              : "text-[var(--text-default,#131416)]"
          }`}
        >
          {icon}
        </div>
        <span
          className={`max-w-[200px] truncate ${
            isActive
              ? "text-[var(--fill-primary-default,#4F5FBF)]"
              : "text-[var(--text-default,#131416)]"
          } text-sm font-medium`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed left-0 h-[calc(100vh)] w-[300px] bg-[var(--surface-inverse,#F9FAFB)] border-r-[1.5px] border-[var(--stroke-deep,#131416)]">
      <div className="flex flex-col h-full px-4">
        {/* Logo */}
        <div className="py-6 px-4 flex items-center justify-between">
          <div className="w-[38px] h-[38px] bg-[var(--fill-primary-default,#4F5FBF)]" />
        </div>

        {/* Main Navigation */}
        <div className="py-4 border-b border-[var(--stroke-minimal,#EDF0F3)] space-y-0.5">
          <NavItem icon={<Home size={20} />} label="홈" to="/dashboard/home" />
          <NavItem
            icon={<LayoutGrid size={20} />}
            label="모든 팀"
            to="/dashboard/all-team"
          />
          <NavItem
            icon={<FolderOpen size={20} />}
            label="공유받은 프로젝트"
            to="/dashboard/shared-projects"
          />
        </div>

        {/* Teams */}
        <div className="flex-1 py-4 space-y-0.5">
          {Array.from(new Set(mockProjects.map((p) => p.team.id))).map(
            (teamId) => {
              const team = mockProjects.find((p) => p.team.id === teamId)?.team;
              if (!team) return null;
              return (
                <NavItem
                  key={team.id}
                  icon={<Folder size={20} />}
                  label={team.name}
                  to={`/dashboard/team/${team.id}`}
                />
              );
            }
          )}
        </div>

        {/* Footer */}
        <div className="py-4">
          <NavItem icon={<LogOut size={20} />} label="Logout" to="/logout" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
