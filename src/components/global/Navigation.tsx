import {
  Home,
  LayoutGrid,
  LogOut,
  Folder,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  showBorder?: boolean;
  isCollapsed?: boolean;
}

interface NavigationProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Navigation = ({ isCollapsed, onToggle }: NavigationProps) => {
  const NavItem = ({ icon, label, isActive, isCollapsed }: NavItemProps) => (
    <div
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
      {!isCollapsed && (
        <span
          className={`${
            isActive
              ? "text-[var(--fill-primary-default,#4F5FBF)]"
              : "text-[var(--text-default,#131416)]"
          } text-sm font-medium`}
        >
          {label}
        </span>
      )}
    </div>
  );
  return (
    <nav
      className={`fixed left-0 h-[calc(100vh)] bg-[var(--surface-inverse,#F9FAFB)] border-r-[1.5px] border-[var(--stroke-deep,#131416)] transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[300px]"
      }`}
    >
      <div className="flex flex-col h-full px-4">
        {/* Logo */}
        <div className="py-6 px-4 flex items-center justify-between">
          <div className="w-[38px] h-[38px] bg-[var(--fill-primary-default,#4F5FBF)]" />
          {!isCollapsed && (
            <button
              onClick={onToggle}
              className="p-2 hover:bg-[var(--fill-minimal,#EDF0F3)] rounded-md transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={onToggle}
              className="p-2 hover:bg-[var(--fill-minimal,#EDF0F3)] rounded-md transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <div className="py-4 border-b border-[var(--stroke-minimal,#EDF0F3)] space-y-0.5">
          <NavItem
            icon={<Home size={20} />}
            label="홈"
            isActive
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<LayoutGrid size={20} />}
            label="모든 팀"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FolderOpen size={20} />}
            label="공유받은 프로젝트"
            isCollapsed={isCollapsed}
          />
        </div>

        {/* 팀 이름은 팀원이 추가할 때마다 추가됩니다. */}
        {/* Teams */}
        <div className="flex-1 py-4 space-y-0.5">
          <NavItem icon={<Folder size={20} />} label="A팀" />
          <NavItem icon={<Folder size={20} />} label="B팀" />
          <NavItem icon={<Folder size={20} />} label="C팀" />
        </div>

        {/* Footer */}
        <div className="py-4">
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
