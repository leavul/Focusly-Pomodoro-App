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
    const [timeLeft, setTimeLeft] = useState(MODE_TIME['work']);
    // is the timer currently running?
    const [timerIsRunning, setTimerIsRunning] = useState(false);

    // handle timer countdown
    useEffect(() => {
        if (!timerIsRunning) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // session finished
                    handleSessionEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timerIsRunning])


    // stop countdown and reset time left
    const stopAndResetTimer = () => {
        setTimerIsRunning(false)
        setTimeLeft(MODE_TIME[mode])
    };


    // reset when the mode changes
    useEffect(() => {
        stopAndResetTimer()
    }, [mode]);

    /*
     called when a session (work or break) finishes 
     
     We calculate the next mode first and use it directly to set timeLeft.
     We do NOT call resetTimeLeft() here because it uses the current `mode` state,
     which may be outdated due to React state updates being asynchronous.
     
     Using the old `mode` would cause a race condition where timeLeft could be set
     incorrectly for the next session. By using `nextMode` directly, we ensure
     timeLeft matches the correct session immediately.
     */
    const handleSessionEnd = () => {
        if (mode === 'work') {
            const newWorkCount = workCount + 1;
            setWorkCount(newWorkCount);
            const nextMode: Mode = newWorkCount % 4 === 0 ? 'longBreak' : 'shortBreak'
            setMode(nextMode)
            setTimeLeft(MODE_TIME[nextMode])
        } else {
            setMode('work');
        }
        setTimerIsRunning(false)
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
                onChange={setMode}
            />

            {/* Time */}
            <TimeDisplay time={formatTime(timeLeft)} />

            {/* Timer status */}
            <TimerStatusDisplay timerIsRunning={timerIsRunning} />

            {/* Reset, Play/Pause and Skip buttons */}
            <ActionButtons
                timerIsRunning={timerIsRunning}
                disableReset={timeLeft === MODE_TIME[mode]}
                onPressReset={stopAndResetTimer}
                onPressPlayPauseToggle={() => setTimerIsRunning(prv => !prv)}
                onPressSkip={() => setTimeLeft(0)}
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