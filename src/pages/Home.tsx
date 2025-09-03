import MainLayout from "../components/layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-[clamp(24px,4vw,48px)]">
        <div className="flex justify-between items-center">
          <h1 className="text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-normal">
            최근항목
          </h1>
          <button className="h-[clamp(44px,5vw,52px)] px-[clamp(16px,2vw,24px)] bg-[#4F5FBF] rounded-md flex items-center">
            <span className="text-white text-[clamp(0.875rem,1.5vw,1rem)] font-semibold whitespace-nowrap">
              새 프로젝트
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
