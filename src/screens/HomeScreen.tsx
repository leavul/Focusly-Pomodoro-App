import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ModeSwitcher, TimeDisplay, TimerStatusDisplay, ActionButtons } from '../components/pomodoro'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMode, tick, resetSession, toggleTimer, skipSession } from '../store/slices/pomodoroSlice';
import { formatTime } from '../utils';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const {
        mode,
        modeDuration,
        timerIsOff,
        timeRemaining,
    } = useSelector((state: RootState) => state.pomodoro)

    useEffect(() => {
        if (timerIsOff) return;

        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);

        return () => clearInterval(interval);
    }, [timerIsOff]);

    return (
        // Switch mode buttons
        <View style={styles.container}>
            <ModeSwitcher mode={mode}
                onChange={(newMode) => dispatch(setMode(newMode))}
            />

            {/* Time */}
            <TimeDisplay time={formatTime(timeRemaining)} />

            {/* Timer status */}
            <TimerStatusDisplay timerIsOff={timerIsOff} />

            {/* Reset, Play/Pause and Skip buttons */}
            <ActionButtons
                timerIsOff={timerIsOff}
                disableReset={timeRemaining === modeDuration}
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