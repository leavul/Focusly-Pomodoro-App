import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Mode } from "../../components/pomodoro";

// Session durations (in minutes).
const WORK_TIME = 25
const SHORT_BREAK_TIME = 5
const LONG_BREAK_TIME = 15

/**
 * Session durations (in seconds).
 */
const MODE_DURATION: Record<Mode, number> = {
    work: WORK_TIME * 60,
    shortBreak: SHORT_BREAK_TIME * 60,
    longBreak: LONG_BREAK_TIME * 60,
};

type PomodoroStateType = {
    currentMode: Mode
    currentModeDuration: number
    timerIsOff: boolean

    /**
     * Time in seconds for UI display only.
     * Does NOT determine when the timer actually ends.
     */
    displayTime: number

    /**
     * Timestamp (ms) when the session ends.
     * 
     * - Represents the actual end time of the current session.
     * - Used by `tick()` to calculate the remaining time.
     * - Ensures the timer remains accurate even if:
     *   - The app goes to the background.
     *   - The user leaves the app or locks the device.
     * - Set to `null` when the timer is not running.
     */
    endTime: null | number
    completedWorkSessions: number
};

const INITIAL_MODE: Mode = 'work'

const initialState: PomodoroStateType = {
    currentMode: INITIAL_MODE,
    currentModeDuration: MODE_DURATION[INITIAL_MODE],
    timerIsOff: true,
    displayTime: MODE_DURATION[INITIAL_MODE],
    endTime: null,
    completedWorkSessions: 0
};

/**
 * Applies a mode and resets its duration.
 */
const applyMode = (state: PomodoroStateType, mode: Mode) => {
    state.currentMode = mode
    const duration = MODE_DURATION[mode]
    state.currentModeDuration = duration
    state.displayTime = duration
}

const pomodoroSlice = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        /**
         * Stop timer and set a new session mode
         * 
         * - Sets `timerIsOff = true` and `endTime = null`.
         * - Updates session values: `mode`, `modeDuration`, and `displayTime`
         *   to the duration of the new mode session.
         */
        setMode(state, action: PayloadAction<Mode>) {
            // Changing mode stops the timer
            state.timerIsOff = true
            state.endTime = null

            // Update mode, duration, and displayTime
            applyMode(state, action.payload)
        },

        /**
         * Handles the timer and session completion.
         * 
         * - Calculates remaining time from `endTime` instead of decrementing manually,
         *   keeping the timer accurate even if the app goes to background.
         * - Updates `displayTime` for the UI while the session is running.
         * - Stops the timer and switches to the next session mode when the session ends.
         */
        tick(state) {
            // If timer is off or endTime is not set: Exit (safety check)
            if (state.timerIsOff === true || state.endTime === null) return

            // Calculate remaining time
            const remainingMs = state.endTime - Date.now()
            const remainingSec = Math.ceil(remainingMs / 1000)

            // If session has remaining time: update UI and exit
            if (remainingSec >= 1) {
                state.displayTime = remainingSec
                return
            }

            // The session finished (remaining time <= 0): stop timer and set up for next session mode
            state.timerIsOff = true
            state.endTime = null

            // If the finished session was a work session: increment work counter and switch to a break session and exit
            if (state.currentMode === 'work') {
                // increment work counter
                state.completedWorkSessions += 1

                // After 4 completed work sessions: switch to a long break.
                // Otherwise: switch to a short break.
                const newBreakSessionMode = state.completedWorkSessions % 4 === 0
                    ? "longBreak"
                    : "shortBreak"

                // Switch to break
                applyMode(state, newBreakSessionMode)
                return
            }

            // If the finished session was a break: switch to a work session
            applyMode(state, "work")
        },

        /**
         * Stops and resets the timer.
         * - Sets `timerIsOff = true` and `endTime = null`.
         * - Resets `displayTime` to the full duration of the current mode session.
         */
        resetSession(state) {
            // Stop mode stops the timer
            state.timerIsOff = true
            state.endTime = null

            // reset UI to show the full duration of the current session mode
            state.displayTime = state.currentModeDuration
        },

        /**
         * Toggles the timer between play and pause.
         * - When playing, sets the `endTime`.
         * - When paused, stops the timer and clears `endTime`.
         */
        toggleTimer(state) {
            // Toggle the timer on or off
            state.timerIsOff = !state.timerIsOff

            state.endTime = state.timerIsOff
                // Timer is paused: clear 'endTime'
                ? null
                // Timer is started: set 'endTime' to the actual future timestamp
                // using 'Date.now() + remainingTime'. 
                // This ensures the timer counts down accurately in real time,
                // even if the app goes to the background, the user leaves the app,
                // or the device is locked.
                // 'tick()' will later compute remaining time based on this timestamp.
                : Date.now() + (state.displayTime * 1000)
        },

        /**
         * Skip the current session.
         * 
         * - Sets `displayTime` to 0 for immediate visual feedback (timer shows 00:00 briefly).
         * - Sets `endTime` to now.
         *
         * All session-end logic remains in `tick()`.
         */
        skipSession(state) {
            // Set UI to show 00:00 immediately as visual feedback
            state.displayTime = 0

            // Set 'endTime' to the current timestamp and leave session-end logic to 'tick()'.
            // This ensures:
            // - All session-end behavior stays centralized in 'tick()', avoiding duplicated logic.
            // - The timer briefly displays 00:00 as visual feedback.
            //   This happens because the session-end logic runs in the next tick cycle inside 'tick()',
            //   creating a short delay that lets the user notice 00:00 before transitioning to the next session.
            state.endTime = Date.now()
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
