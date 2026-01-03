import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Mode = "work" | "shortBreak" | "longBreak"

const WORK_TIME = 25 * 60
const SHORT_BREAK_TIME = 5 * 60
const LONG_BREAK_TIME = 15 * 60

const MODE_DURATION: Record<Mode, number> = {
    work: WORK_TIME,
    shortBreak: SHORT_BREAK_TIME,
    longBreak: LONG_BREAK_TIME,
};

type PomodoroState = {
    mode: Mode
    modeDuration: number
    timerIsOff: boolean
    timeRemaining: number
    completedWorkSessions: number
};

const initialState: PomodoroState = {
    mode: "work",
    modeDuration: MODE_DURATION['work'],
    timerIsOff: true,
    timeRemaining: MODE_DURATION['work'],
    completedWorkSessions: 0
};

/**
 * Helper: apply mode and reset timer
 */
const applyMode = (state: PomodoroState, mode: Mode) => {
    state.mode = mode
    const duration = MODE_DURATION[mode]
    state.modeDuration = duration
    state.timeRemaining = duration
}

const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<Mode>) {
            state.timerIsOff = true
            applyMode(state, action.payload)
        },
        tick(state) {
            const timeRemaining = state.timeRemaining
            if (timeRemaining <= 0) {
                state.timerIsOff = true

                // If the finished session was a work session:
                if (state.mode === 'work') {
                    state.completedWorkSessions += 1

                    // After 4 completed work sessions, switch to a long break.
                    // Otherwise, switch to a short break.
                    applyMode(
                        state,
                        state.completedWorkSessions % 4 === 0
                            ? "longBreak"
                            : "shortBreak"
                    )
                } else {
                    // If the finished session was a break, start a new work session
                    applyMode(state, "work")
                }
            } else {
                state.timeRemaining -= 1
            }
        },
        resetSession(state) {
            state.timerIsOff = true
            state.timeRemaining = state.modeDuration
        },
        toggleTimer(state) {
            state.timerIsOff = !state.timerIsOff
        },
        skipSession(state) {
            state.timeRemaining = 0
        }
    }
});

export const {
    setMode,
    tick,
    resetSession,
    toggleTimer,
    skipSession,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
