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
    /**
     * Current session mode: work, short break, or long break.
     */
    currentMode: Mode

    /**
     * Duration of the current mode session in seconds.
     * 
     * Used for:
     * - Comparing with `displayTime` to check if the Reset button should be disabled.
     * - Resetting `displayTime` to this value when pressing the Reset button.
     */
    currentModeDuration: number

    /**
     * Indicates whether the timer is currently paused.
     * - true: timer is off
     * - false: timer is running
     */
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

    /**
     * Counts completed work sessions.
     * Used to determine when to switch to long breaks.
     */
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
 * Sets the given session mode and resets its duration.
 *
 * - Updates `currentMode` to the new mode.
 * - Resets `currentModeDuration` and `displayTime` to match the new mode.
 */
const applyMode = (state: PomodoroStateType, newMode: Mode) => {
    // Set new mode
    state.currentMode = newMode

    // Set new mode durations
    const duration = MODE_DURATION[state.currentMode]
    state.currentModeDuration = duration
    state.displayTime = duration
}

/**
 * Move to the next session mode based on current state.
 * 
 * - If the current session was a work session, increments completed work sessions
 *   and switches to a short or long break.
 * - If the current session was a break, switches to a work session.
 * - Updates `currentMode`, `currentModeDuration`, and `displayTime` accordingly.
 */
const moveToNextSessionMode = (state: PomodoroStateType) => {
    // If the finished session was a work session: increment work counter, switch to a break session and exit
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
}

/**
 * Pomodoro slice for managing timer state and sessions.
 *
 * - Handles timer modes: work, short break, long break.
 * - Tracks completed work sessions to switch to long breaks automatically.
 * - Manages `displayTime` for UI and `endTime` for accurate real-time countdowns,
 *   even if the app goes to background or device is locked.
 * - Provides actions to set mode, toggle timer, reset, tick, and skip sessions.
 */
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
        setNewMode(state, action: PayloadAction<Mode>) {
            const newMode = action.payload

            // If selecting the same mode: Exit
            if (newMode === state.currentMode) return

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

            // Move to the next session
            moveToNextSessionMode(state)
        },

        /**
         * Stops and resets the timer.
         * - Sets `timerIsOff = true` and `endTime = null`.
         * - Resets `displayTime` to the full duration of the current mode session.
         */
        resetSession(state) {
            // Reset session stops the timer
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
         * Stop timer and skip the current session.
         * - Sets `timerIsOff = true` and `endTime = null`.
         * - Move to the next session
         */
        skipSession(state) {
            // stops the timer
            state.timerIsOff = true
            state.endTime = null

            // Move to the next session
            moveToNextSessionMode(state)
        }
    }
});

export const {
    setNewMode,
    tick,
    resetSession,
    toggleTimer,
    skipSession,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
