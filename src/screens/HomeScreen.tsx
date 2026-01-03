import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Mode, ModeSwitcher, TimeDisplay, TimerStatusDisplay, ActionButtons } from '../components/pomodoro'

const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;
const MODE_TIME: Record<Mode, number> = {
    work: WORK_TIME,
    shortBreak: SHORT_BREAK,
    longBreak: LONG_BREAK,
};
const HomeScreen = () => {
    // current Pomodoro mode (work / shortBreak / longBreak)
    const [mode, setMode] = useState<Mode>('work');
    // number of completed work sessions
    const [workCount, setWorkCount] = useState(0);
    // time left in seconds for current session
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    // is the timer currently running?
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    // the exact timestamp when the current session should end
    const [endTime, setEndTime] = useState<number | null>(null);

    // handel change mode status
    useEffect(() => {
        setTimeLeft(MODE_TIME[mode])
    }, [mode]);

    // handle timer countdown
    useEffect(() => {
        if (!timerIsRunning) return;

        const interval = setInterval(() => {
            const remaining = Math.round((endTime! - Date.now()) / 1000);

            setTimeLeft(remaining);

            if (remaining <= 0) {
                handleSessionEnd()
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerIsRunning, endTime]);

    const onChangeMode = (newMode: Mode) => {
        setTimerIsRunning(false)
        setMode(newMode)
    }

    // stop countdown and recalculate new time left
    const onReset = () => {
        setTimerIsRunning(false)
        setEndTime(null)
        setTimeLeft(MODE_TIME[mode])
    };

    // toggle play/pause button
    const onTogglePlayPause = () => {
        if (timerIsRunning) {
            // stop timer
            setTimerIsRunning(false);
            setEndTime(null);
        } else {
            // start timer: calculate new endTime based on remaining time
            setEndTime(Date.now() + timeLeft! * 1000);
            setTimerIsRunning(true);
        }
    };

    const onSkip = () => {
        setTimeLeft(0)
        setEndTime(null)

        // NOTE:
        // If you want to skip the session instantly (no 1s delay for the user),
        // call handleSessionEnd() directly instead of waiting for the timer tick.
    };

    const handleSessionEnd = () => {
        setTimerIsRunning(false)

        // If the finished session was a work session:
        if (mode === 'work') {
            const newWorkCount = workCount + 1;
            setWorkCount(newWorkCount);

            // After 4 completed work sessions, switch to a long break.
            // Otherwise, switch to a short break.
            const nextMode: Mode = newWorkCount % 4 === 0 ? 'longBreak' : 'shortBreak'
            setMode(nextMode)
        } else {
            // If the finished session was a break, start a new work session
            setMode('work');
        }
    }

    const formatTime = (seconds: number): string => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m} : ${s}`;
    }

    return (
        // Switch mode buttons
        <View style={styles.container}>
            <ModeSwitcher mode={mode}
                onChange={onChangeMode}
            />

            {/* Time */}
            <TimeDisplay time={formatTime(timeLeft!)} />

            {/* Timer status */}
            <TimerStatusDisplay timerIsRunning={timerIsRunning} />

            {/* Reset, Play/Pause and Skip buttons */}
            <ActionButtons
                timerIsRunning={timerIsRunning}
                disableReset={timeLeft === MODE_TIME[mode]}
                onPressReset={onReset}
                onPressTogglePlayPause={onTogglePlayPause}
                onPressSkip={onSkip}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})