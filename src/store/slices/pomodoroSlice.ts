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

type PomodoroStateType = {
    mode: Mode
    modeDuration: number
    timerIsOff: boolean
    timeRemaining: number
    timeToEnd: number
    completedWorkSessions: number
};

const initialState: PomodoroStateType = {
    mode: "work",
    modeDuration: MODE_DURATION['work'],
    timerIsOff: true,
    timeRemaining: MODE_DURATION['work'],
    timeToEnd: 0,
    completedWorkSessions: 0
};

/**
 * Helper: apply mode and reset timer
 */
const applyMode = (state: PomodoroStateType, mode: Mode) => {
    state.mode = mode
    const duration = MODE_DURATION[mode]
    state.modeDuration = duration
    state.timeRemaining = duration
}

const calculateNewTimeToEnd = (state: PomodoroStateType) => {
    return Date.now() + state.timeRemaining * 1000
}

const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<Mode>) {
            state.timerIsOff = true
            state.timeToEnd = 0
            applyMode(state, action.payload)
        },
        tick(state) {
            const remainingMs = state.timeToEnd - Date.now()
            const remainingSec = Math.ceil(remainingMs / 1000)

            if (remainingSec <= 0) {
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
                state.timeRemaining = remainingSec
            }
        },
        resetSession(state) {
            state.timerIsOff = true
            state.timeToEnd = 0
            state.timeRemaining = state.modeDuration
        },
        toggleTimer(state) {
            state.timerIsOff = !state.timerIsOff
            state.timeToEnd = state.timerIsOff ? 0 : calculateNewTimeToEnd(state)
        },
        skipSession(state) {
            state.timeRemaining = 0
            state.timeToEnd = 0
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
