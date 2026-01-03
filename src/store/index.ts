import { configureStore } from "@reduxjs/toolkit";
import pomodoroSlice from "./slices/pomodoroSlice";

export const store = configureStore({
    reducer: {
        pomodoro: pomodoroSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
