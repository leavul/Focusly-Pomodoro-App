import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ModeSwitcher, TimerDisplay, TimerStatusDisplay, ActionButtons } from '../components/pomodoro'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMode, tick, resetSession, toggleTimer, skipSession } from '../store/slices/pomodoroSlice';
import { formatTime } from '../utils';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const {
        currentMode,
        currentModeDuration,
        timerIsOff,
        displayTime,
    } = useSelector((state: RootState) => state.pomodoro)

    useEffect(() => {
        // Exit early if the timer is not running
        if (timerIsOff) return;

        // Dispatch 'tick()' every second while the timer is active
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);

        // Cleanup interval when the timer stops or component unmounts
        return () => clearInterval(interval);
    }, [timerIsOff]);

    // Convert the display-only time (seconds) into visual time for UI
    const formattedTime = formatTime(displayTime);

    return (
        // Switch mode section
        <View style={styles.container}>
            <ModeSwitcher
                currentMode={currentMode}
                onChange={(newMode) => dispatch(setMode(newMode))}
            />

            {/* Timer display */}
            <TimerDisplay time={formattedTime} />

            {/* Timer status indicator */}
            <TimerStatusDisplay timerIsOff={timerIsOff} />

            {/* Action buttons: Reset, Play/Pause, Skip */}
            <ActionButtons
                timerIsOff={timerIsOff}
                disableReset={displayTime === currentModeDuration}
                onPressReset={() => dispatch(resetSession())}
                onPressTogglePlayPause={() => dispatch(toggleTimer())}
                onPressSkip={() => dispatch(skipSession())}
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