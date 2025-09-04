interface DashboardHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const DashboardHeader = ({ title, buttonText, onButtonClick }: DashboardHeaderProps) => (
  <div className="flex justify-between items-center">
    <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
      {title}
    </h1>
    <button 
      onClick={onButtonClick}
      className="h-[clamp(44px,5vw,52px)] px-[clamp(16px,2vw,24px)] bg-[#4F5FBF] rounded-md flex items-center"
    >
      <span className="text-white text-[clamp(0.875rem,1.5vw,1rem)] font-semibold whitespace-nowrap">
        {buttonText || '새 프로젝트'}
      </span>
    </button>
  </div>
);

export default DashboardHeader;
