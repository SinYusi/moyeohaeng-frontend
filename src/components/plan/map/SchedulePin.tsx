interface SchedulePinProps {
  day: number;
  sequenceNumber: number; // 시간 순서대로 매겨진 번호
}

const COLORS = [
  "#fb7354", // 1일차 - 빨강
  "#ffe74c", // 2일차 - 노랑
  "#8ee888", // 3일차 - 초록
  "#7feddc", // 4일차 - 청록
  "#73c3fb", // 5일차 - 파랑
  "#cf94ff", // 6일차 - 보라
  "#ffa6bf", // 7일차 - 분홍
];

const SchedulePin: React.FC<SchedulePinProps> = ({ day, sequenceNumber }) => {
  // 색상 인덱스 계산 (1일차부터 시작하므로 day-1, 8일차 이후는 순환)
  const colorIndex = (day - 1) % COLORS.length;
  const color = COLORS[colorIndex];

  return (
    <div 
      className="relative w-6 h-6 border-2 border-white rounded-full flex items-center justify-center shadow-md"
      style={{ backgroundColor: color }}
    >
      <span className="text-white text-xs font-bold leading-none">
        {sequenceNumber}
      </span>
    </div>
  );
};

export default SchedulePin;
