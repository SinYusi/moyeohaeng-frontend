import useGetGroup from "../../../hooks/plan/group/useGetGroup";
import EmptyScheduleGroup from "./EmptyScheduleGroup";

const GroupList: React.FC = () => {
  const { group, isLoading, error } = useGetGroup();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (group.length === 0) {
    return <EmptyScheduleGroup />;
  }
  return <div className="flex items-start gap-4 self-stretch flex-wrap"></div>;
};

export default GroupList;
