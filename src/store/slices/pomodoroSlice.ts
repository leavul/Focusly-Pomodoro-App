import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, MODE_DURATION } from "../../types/pomodoro";

type PomodoroState = {
    sessionMode: Mode
    timerStatus: 'paused' | 'running' | 'completed'
    remainingTime: number
    endTime: number | null
    focusCount: number
}

const initialState: PomodoroState = {
    sessionMode: 'focus',
    timerStatus: 'paused',
    remainingTime: MODE_DURATION['focus'],
    endTime: null,
    focusCount: 0,
}

const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        changeSessionMode(state, action: PayloadAction<Mode>) {
            if (state.sessionMode === action.payload) return

            state.sessionMode = action.payload
            state.remainingTime = MODE_DURATION[action.payload]
            state.timerStatus = 'paused'
            state.endTime = null
        },

        startTimer(state) {
            if (state.timerStatus === 'running') return

            state.timerStatus = 'running'
            state.endTime = Date.now() + (state.remainingTime * 1000)
        },

        pauseTimer(state) {
            if (state.timerStatus === 'paused') return

            state.timerStatus = 'paused'
            state.endTime = null
        },

        tickTimer(state) {
            if (state.timerStatus !== 'running' || state.endTime === null) return

            const newRemaining = Math.ceil((state.endTime - Date.now()) / 1000)
            if (newRemaining <= 0) {
                pomodoroSlice.caseReducers.finishTimer(state)
            }
            else {
                state.remainingTime = newRemaining
            }

        },

        finishTimer(state) {
            state.timerStatus = 'completed'
        },

        resetTimer(state) {
            if (state.remainingTime === MODE_DURATION[state.sessionMode]) return

            state.remainingTime = MODE_DURATION[state.sessionMode]
            state.timerStatus = 'paused'
            state.endTime = null
        },

        moveToNextSessionMode(state) {
            if (state.sessionMode === 'focus') {
                const completedFocusCount = state.focusCount + 1
                const nextMode = completedFocusCount % 4 === 0 ? 'longBreak' : 'shortBreak'

                state.sessionMode = nextMode
                state.remainingTime = MODE_DURATION[nextMode]
                state.focusCount = completedFocusCount
            } else {
                state.sessionMode = 'focus'
                state.remainingTime = MODE_DURATION['focus']
            }

            state.timerStatus = 'paused'
            state.endTime = null
        }
    }
});

export const {
    changeSessionMode,
    startTimer,
    pauseTimer,
    tickTimer,
    resetTimer,
    moveToNextSessionMode,
} = pomodoroSlice.actions

export default pomodoroSlice.reducer