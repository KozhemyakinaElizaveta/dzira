import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  [taskId: string]: {
    startTime: number | null;
    elapsedTime: number;
    isRunning: boolean;
  };
}

const initialState: TimerState = {};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      if (!state[taskId]) {
        state[taskId] = { startTime: null, elapsedTime: 0, isRunning: false };
      }
      if (!state[taskId].isRunning) {
        state[taskId].startTime = Date.now() - state[taskId].elapsedTime;
        state[taskId].isRunning = true;
      }
    },
    stopTimer(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      if (state[taskId]?.isRunning) {
        state[taskId].elapsedTime = Date.now() - (state[taskId].startTime || 0);
        state[taskId].isRunning = false;
      }
    },
    resetTimer(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      if (state[taskId]) {
        state[taskId].startTime = null;
        state[taskId].elapsedTime = 0;
        state[taskId].isRunning = false;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;