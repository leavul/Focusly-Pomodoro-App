import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../types/pomodoro";

const MODE_DURATION: Record<Mode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
}

type PomodoroState = {
    mode: Mode
    timerStatus: 'paused' | 'running' | 'completed'
    remaining: number
    endTime: number | null
    focusCount: number
}

const initialState: PomodoroState = {
    mode: 'focus',
    timerStatus: 'paused',
    remaining: MODE_DURATION['focus'],
    endTime: null,
    focusCount: 0,
}

type NextSessionType = {
    mode: Mode
    remaining: number
    focusCount: number
}

function nextSession(state: PomodoroState): NextSessionType {
    if (state.mode === 'focus') {
        const completed = state.focusCount + 1
        const nextMode = completed % 4 === 0 ? 'longBreak' : 'shortBreak'
        return {
            mode: nextMode,
            remaining: MODE_DURATION[nextMode],
            focusCount: completed
        }
    }

    return {
        ...state,
        mode: 'focus',
        remaining: MODE_DURATION['focus']
    }
}

function applyNextSession(state: PomodoroState) {
    const next = nextSession(state)

    state.mode = next.mode
    state.timerStatus = 'paused'
    state.remaining = next.remaining
    state.focusCount = next.focusCount
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
            state.timerStatus = 'completed'
        },

        reset(state) {
            if (state.remaining === MODE_DURATION[state.mode]) return

            state.remaining = MODE_DURATION[state.mode]
            state.timerStatus = 'paused'
            state.endTime = null
        },

        moveToNextSession(state) {
            applyNextSession(state)
        },
    }
});

export const {
    changeMode,
    start,
    pause,
    tick,
    reset,
    moveToNextSession,
} = pomodoroSlice.actions

export default pomodoroSlice.reducer