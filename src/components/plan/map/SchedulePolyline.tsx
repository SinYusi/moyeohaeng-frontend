import { Polyline } from "react-kakao-maps-sdk";
import type { ScheduleTimeBlock } from "../../../types/planTypes";

interface SchedulePolylineProps {
  timeBlocks: ScheduleTimeBlock[];
}

const SchedulePolyline: React.FC<SchedulePolylineProps> = ({ timeBlocks }) => {
  // 시간이 지정된 블록들만 필터링하고 시간 순으로 정렬
  const sortedTimeBlocks = timeBlocks
    .filter((timeBlock) => 
      timeBlock.placeDetail.latitude && 
      timeBlock.placeDetail.longitude &&
      timeBlock.startTime && 
      timeBlock.endTime
    )
    .sort((a, b) => {
      // 일차별로 먼저 정렬, 같은 일차 내에서는 시간순 정렬
      if (a.day !== b.day) {
        return a.day - b.day;
      }
      return a.startTime!.localeCompare(b.startTime!);
    });

  // 2개 이상의 핀이 있어야 라인을 그을 수 있음
  if (sortedTimeBlocks.length < 2) {
    return null;
  }

  // 좌표 배열 생성
  const path = sortedTimeBlocks.map((timeBlock) => ({
    lat: timeBlock.placeDetail.latitude,
    lng: timeBlock.placeDetail.longitude,
  }));

  return (
    <Polyline
      path={path}
      strokeWeight={3}
      strokeColor="#4f5fbf"
      strokeOpacity={0.8}
      strokeStyle="shortdash" // 점선 스타일
    />
  );
};

export default SchedulePolyline;
