import useGetGroups from "../../../hooks/plan/group/useGetGroups";
import EmptyScheduleGroup from "./EmptyScheduleGroup";
import ScheduleGroup from "./ScheduleGroup";
import { forwardRef, useImperativeHandle } from "react";

interface GroupListRef {
  refreshGroups: () => void;
}

const GroupList = forwardRef<GroupListRef>((_, ref) => {
  const { group, isLoading, error, getGroups } = useGetGroups();

  useImperativeHandle(ref, () => ({
    refreshGroups: getGroups,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (group.length === 0) {
    return <EmptyScheduleGroup />;
  }

  return (
    <div className="flex items-start gap-4 self-stretch flex-wrap">
      {group.map((group) => (
        <ScheduleGroup key={group.id} group={group} />
      ))}
    </div>
  );
});

GroupList.displayName = "GroupList";

export default GroupList;
