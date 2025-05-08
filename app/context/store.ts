import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TimerState = {
  // Active timers state
  activeTimers: Record<string, boolean>;
  // Accumulated time for each task (in seconds)
  timeRecords: Record<string, number>;
  // Last updated timestamp for each task
  lastUpdated: Record<string, number>;
  // Track when timers were started
  startTimes: Record<string, number>;
  // Track when timers were stopped
  endTimes: Record<string, number>;
};

type TimerActions = {
  // Start a timer for a specific task
  startTimer: (taskId: string) => void;
  // Stop a timer for a specific task
  stopTimer: (taskId: string) => void;
  // Toggle timer state
  toggleTimer: (taskId: string) => void;
  // Update time for active tasks
  updateTimers: () => void;
  // Reset timer for a specific task
  resetTimer: (taskId: string) => void;
  // Get elapsed time for a task
  getElapsedTime: (taskId: string) => number;
  // Get start and end times for a task
  getTimeStamps: (taskId: string) => { startTime?: number; endTime?: number };
};

const initialState: TimerState = {
  activeTimers: {},
  timeRecords: {},
  lastUpdated: {},
  startTimes: {},
  endTimes: {},
};

export const useTimerStore = create<TimerState & TimerActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      startTimer: (taskId) => {
        const now = Date.now();
        set((state) => ({
          activeTimers: { ...state.activeTimers, [taskId]: true },
          lastUpdated: { ...state.lastUpdated, [taskId]: now },
          startTimes: { ...state.startTimes, [taskId]: now },
        }));
      },

      stopTimer: (taskId) => {
        const { activeTimers, timeRecords, lastUpdated } = get();
        if (!activeTimers[taskId]) return;

        const now = Date.now();
        const elapsedSeconds = Math.floor(
          (now - (lastUpdated[taskId] || now)) / 1000
        );

        set({
          activeTimers: { ...activeTimers, [taskId]: false },
          timeRecords: {
            ...timeRecords,
            [taskId]: (timeRecords[taskId] || 0) + elapsedSeconds,
          },
          lastUpdated: { ...lastUpdated, [taskId]: now },
          endTimes: { ...get().endTimes, [taskId]: now },
        });
      },

      toggleTimer: (taskId) => {
        const { activeTimers } = get();
        if (activeTimers[taskId]) {
          get().stopTimer(taskId);
        } else {
          get().startTimer(taskId);
        }
      },

      updateTimers: () => {
        const { activeTimers, lastUpdated, timeRecords } = get();
        const now = Date.now();
        const updates: Partial<TimerState> = { lastUpdated: {} };

        Object.entries(activeTimers).forEach(([taskId, isActive]) => {
          if (isActive) {
            const elapsedSeconds = Math.floor(
              (now - (lastUpdated[taskId] || now)) / 1000
            );
            updates.timeRecords = {
              ...timeRecords,
              [taskId]: (timeRecords[taskId] || 0) + elapsedSeconds,
            };
            updates.lastUpdated = {
              ...updates.lastUpdated,
              [taskId]: now,
            };
          }
        });

        if (
          updates.lastUpdated &&
          Object.keys(updates.lastUpdated).length > 0
        ) {
          set(updates);
        }
      },

      resetTimer: (taskId) => {
        set((state) => ({
          timeRecords: { ...state.timeRecords, [taskId]: 0 },
          lastUpdated: { ...state.lastUpdated, [taskId]: Date.now() },
          startTimes: { ...state.startTimes, [taskId]: Date.now() },
          endTimes: { ...state.endTimes, [taskId]: Date.now() },
        }));
      },

      getElapsedTime: (taskId) => {
        const { activeTimers, timeRecords, lastUpdated } = get();
        const baseTime = timeRecords[taskId] || 0;

        if (activeTimers[taskId]) {
          const now = Date.now();
          return (
            baseTime + Math.floor((now - (lastUpdated[taskId] || now)) / 1000)
          );
        }

        return baseTime;
      },

      getTimeStamps: (taskId) => {
        const { startTimes, endTimes } = get();
        return {
          startTime: startTimes[taskId],
          endTime: endTimes[taskId],
        };
      },
    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        timeRecords: state.timeRecords,
        lastUpdated: state.lastUpdated,
        startTimes: state.startTimes,
        endTimes: state.endTimes,
      }),
    }
  )
);

// Update timers every second if any are active
if (typeof window !== "undefined") {
  setInterval(() => {
    const { activeTimers } = useTimerStore.getState();
    if (Object.values(activeTimers).some(Boolean)) {
      useTimerStore.getState().updateTimers();
    }
  }, 1000);
}
