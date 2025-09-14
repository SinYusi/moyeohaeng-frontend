import { create } from "zustand";
import {
  type TravelSchedule,
  type ScheduleTimeBlock,
  type ScheduleState,
  type ScheduleActions,
} from "../types/planTypes";

interface ScheduleStore extends ScheduleState, ScheduleActions {}

export const useScheduleStore = create<ScheduleStore>()((set, get) => ({
      // 초기 상태
      schedule: null,
      isScheduleSet: false,
      currentProjectId: null,

      // 액션들
      setSchedule: (schedule: TravelSchedule, projectId?: string) => {
        set({
          schedule,
          isScheduleSet: true,
          currentProjectId: projectId || null,
        });
      },

      setCurrentProject: (projectId: string | null) => {
        set({ currentProjectId: projectId });
      },

      addTimeBlock: (timeBlock: ScheduleTimeBlock) => {
        const { schedule } = get();
        if (!schedule) return;

        set({
          schedule: {
            ...schedule,
            timeBlocks: [...schedule.timeBlocks, timeBlock],
          },
        });
      },

      updateTimeBlock: (id: string, updates: Partial<ScheduleTimeBlock>) => {
        const { schedule } = get();
        if (!schedule) return;

        set({
          schedule: {
            ...schedule,
            timeBlocks: schedule.timeBlocks.map((block) =>
              block.id === id ? { ...block, ...updates } : block
            ),
          },
        });
      },

      removeTimeBlock: (id: string) => {
        const { schedule } = get();
        if (!schedule) return;

        set({
          schedule: {
            ...schedule,
            timeBlocks: schedule.timeBlocks.filter((block) => block.id !== id),
          },
        });
      },

      setTimeBlocks: (timeBlocks: ScheduleTimeBlock[]) => {
        const { schedule } = get();
        if (!schedule) return;

        set({
          schedule: {
            ...schedule,
            timeBlocks,
          },
        });
      },

      clearSchedule: () => {
        set({
          schedule: null,
          isScheduleSet: false,
          currentProjectId: null,
        });
      },

      getTimeBlocksByDay: (day: number) => {
        const { schedule } = get();
        if (!schedule) return [];

        return schedule.timeBlocks.filter((block) => block.day === day);
      },
}));

// 편의 함수들
export const getScheduleDuration = () => {
  const schedule = useScheduleStore.getState().schedule;
  return schedule?.duration || 0;
};

export const getScheduleDateRange = () => {
  const schedule = useScheduleStore.getState().schedule;
  if (!schedule) return null;

  return {
    startDate: schedule.startDate,
    endDate: schedule.endDate,
  };
};

export const getTotalTimeBlocks = () => {
  const schedule = useScheduleStore.getState().schedule;
  return schedule?.timeBlocks.length || 0;
};

export const getTimeBlocksGroupedByDay = () => {
  const schedule = useScheduleStore.getState().schedule;
  if (!schedule) return {};

  return schedule.timeBlocks.reduce((acc, block) => {
    if (!acc[block.day]) {
      acc[block.day] = [];
    }
    acc[block.day].push(block);
    return acc;
  }, {} as Record<number, ScheduleTimeBlock[]>);
};

// 일정 정보 검증 함수
export const isValidSchedule = (schedule: TravelSchedule | null): boolean => {
  if (!schedule) return false;
  return !!(
    schedule.startDate && 
    schedule.endDate && 
    schedule.duration > 0 &&
    schedule.startDate !== schedule.endDate
  );
};

// 현재 일정이 프로젝트 정보와 일치하는지 확인
export const isScheduleMatchingProject = (
  projectInfo: { startDate?: string; endDate?: string; durationDays?: number }
): boolean => {
  const schedule = useScheduleStore.getState().schedule;
  if (!schedule || !projectInfo) return false;
  
  return (
    schedule.startDate === (projectInfo.startDate || "") &&
    schedule.endDate === (projectInfo.endDate || "") &&
    schedule.duration === (projectInfo.durationDays || 0)
  );
};

// 디버깅용 함수
export const logScheduleState = () => {
  const state = useScheduleStore.getState();
  console.log("Current Schedule State:", {
    schedule: state.schedule,
    isScheduleSet: state.isScheduleSet,
    timeBlocksCount: state.schedule?.timeBlocks.length || 0,
    isValid: isValidSchedule(state.schedule),
  });
};
