// 가독성을 위한 시간 단위 상수 정의
const MINUTE = 1;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30; // 근사값
const YEAR = DAY * 365; // 근사값

// 시간 단위 배열 (작은 단위부터 큰 단위 순)
const TIME_UNITS = [
  { name: "분", divisor: MINUTE, limit: 60 },
  { name: "시간", divisor: HOUR, limit: 24 },
  { name: "일", divisor: DAY, limit: 7 },
  { name: "주", divisor: WEEK, limit: 5 },
  { name: "개월", divisor: MONTH, limit: 12 },
  { name: "년", divisor: YEAR, limit: Infinity },
];

/**
 * 주어진 시간으로부터 현재까지 얼마나 지났는지 계산하여 반환합니다. (한국 시간 기준)
 * @param input 계산할 날짜 문자열 (ISO 8601 형식 권장)
 * @returns { value: number | string, unit: string } 경과된 시간의 값과 단위를 포함하는 객체
 */
export function getTimeAgo(input: string): {
  value: number | string;
  unit: string;
} {
  // 한국 시간대(Asia/Seoul)로 변환
  const date = new Date(input);
  const now = new Date();
  
  // 한국 시간으로 변환 (UTC+9)
  const koreaDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const koreaNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  
  const diffInMinutes = Math.floor(
    (koreaNow.getTime() - koreaDate.getTime()) / (1000 * 60)
  );

  if (Number.isNaN(diffInMinutes)) {
    return { value: input, unit: "" };
  }

  for (const unit of TIME_UNITS) {
    const value = Math.floor(diffInMinutes / unit.divisor);
    if (value < unit.limit) {
      return { value, unit: unit.name };
    }
  }

  return { value: diffInMinutes, unit: "분" }; // 예외 처리
}
