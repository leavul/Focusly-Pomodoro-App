import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../types/pomodoro";

const MODE_DURATION: Record<Mode, number> = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
}

type PomodoroState = {
    mode: Mode
    timerStatus: 'paused' | 'running' | 'completed'
    remaining: number
    endTime: number | null
    completedWork: number
}

const initialState: PomodoroState = {
    mode: 'work',
    timerStatus: 'paused',
    remaining: MODE_DURATION['work'],
    endTime: null,
    completedWork: 0,
}

type NextSessionResult = {
    mode: Mode
    remaining: number
    completedWork: number
}

function nextSession(state: PomodoroState): NextSessionResult {
    if (state.mode === 'work') {
        const completed = state.completedWork + 1
        const nextMode = completed % 4 === 0 ? 'longBreak' : 'shortBreak'
        return {
            mode: nextMode,
            remaining: MODE_DURATION[nextMode],
            completedWork: completed
        }
    }

    return {
        ...state,
        mode: 'work',
        remaining: MODE_DURATION['work']
    }
}

function applyNextSession(state: PomodoroState, { newTimerStatus }: { newTimerStatus: 'paused' | 'completed' }) {
    const next = nextSession(state)

    state.mode = next.mode
    state.timerStatus = newTimerStatus
    state.remaining = next.remaining
    state.completedWork = next.completedWork
    state.endTime = null
}

const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        changeMode(state, action: PayloadAction<Mode>) {
            if (state.mode === action.payload) return

            state.mode = action.payload
            state.remaining = MODE_DURATION[action.payload]
            state.timerStatus = 'paused'
            state.endTime = null
        },

        start(state) {
            if (state.timerStatus === 'running') return

            state.timerStatus = 'running'
            state.endTime = Date.now() + (state.remaining * 1000)
        },

        pause(state) {
            if (state.timerStatus === 'paused') return

            state.timerStatus = 'paused'
            state.endTime = null
        },

        tick(state) {
            if (state.timerStatus === 'paused' || state.endTime === null) return

            const newRemaining = Math.ceil((state.endTime - Date.now()) / 1000)
            if (newRemaining <= 0) {
                pomodoroSlice.caseReducers.finish(state)
            }
            else {
                state.remaining = newRemaining
            }

        },

        finish(state) {
            applyNextSession(state, { newTimerStatus: 'completed' })
        },

        reset(state) {
            if (state.remaining === MODE_DURATION[state.mode]) return

            state.remaining = MODE_DURATION[state.mode]
            state.timerStatus = 'paused'
            state.endTime = null
        },

        skip(state) {
            applyNextSession(state, { newTimerStatus: 'paused' })
        },

        clearTimerCompleted(state) {
            state.timerStatus = 'paused'
        }
    }
});

export const {
    changeMode,
    start,
    pause,
    tick,
    reset,
    skip,
    clearTimerCompleted
} = pomodoroSlice.actions

export default pomodoroSlice.reducer