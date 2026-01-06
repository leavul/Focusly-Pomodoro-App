import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode } from "../../types/pomodoro";

const MODE_DURATION: Record<Mode, number> = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
}

type PomodoroState = {
    mode: Mode
    phase: 'idle' | 'running'
    remaining: number
    endTime: number | null
    completedWork: number
}

const initialState: PomodoroState = {
    mode: 'work',
    phase: 'idle',
    remaining: MODE_DURATION['work'],
    endTime: null,
    completedWork: 0,
}

// helper function
function nextSession(state: PomodoroState): PomodoroState {
    if (state.mode === 'work') {
        const completed = state.completedWork + 1
        const nextMode = completed % 4 === 0 ? 'longBreak' : 'shortBreak'
        return {
            ...state,
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

const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        changeMode(state, action: PayloadAction<Mode>) {
            if (state.mode === action.payload) return

            state.mode = action.payload
            state.remaining = MODE_DURATION[action.payload]
            state.phase = 'idle'
            state.endTime = null
        },

        start(state) {
            if (state.phase === 'running') return

            state.phase = 'running'
            state.endTime = Date.now() + (state.remaining * 1000)
        },

        pause(state) {
            if (state.phase === 'idle') return

            state.phase = 'idle'
            state.endTime = null
        },

        tick(state) {
            if (state.phase === 'idle' || !state.endTime) return

            const newRemaining = Math.ceil((state.endTime - Date.now()) / 1000)
            if (newRemaining <= 0) {
                pomodoroSlice.caseReducers.finish(state)
            }
            else {
                state.remaining = newRemaining
            }

        },

        finish(state) {
            const next = nextSession(state)

            state.mode = next.mode
            state.remaining = next.remaining
            state.completedWork = next.completedWork
            state.phase = 'idle'
            state.endTime = null

            // TODO: trigger user notification (sound/modal) for session end
        },

        reset(state) {
            if (state.remaining === MODE_DURATION[state.mode]) return

            state.remaining = MODE_DURATION[state.mode]
            state.phase = 'idle'
            state.endTime = null
        },

        skip(state) {
            const next = nextSession(state)

            state.mode = next.mode
            state.remaining = next.remaining
            state.completedWork = next.completedWork
            state.phase = 'idle'
            state.endTime = null
        },
    }
});

export const {
    changeMode,
    start,
    pause,
    tick,
    reset,
    skip,
} = pomodoroSlice.actions

export default pomodoroSlice.reducer