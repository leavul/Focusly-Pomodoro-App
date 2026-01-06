import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    TimerStatusIndicator,
    ActionButtons
} from '../components/pomodoro'
import { RootState } from '../store';
import {
    changeMode,
    start,
    pause,
    tick,
    reset,
    skip,
} from '../store/slices/pomodoroSlice';
import { View, StyleSheet } from 'react-native'
import { formatTime } from '../utils';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const {
        phase,
        mode: currentMode,
        remaining,
    } = useSelector((state: RootState) => state.pomodoro)

    useEffect(() => {
        if (phase !== 'running') return

        const interval = setInterval(() => {
            dispatch(tick())
        }, 1000)

        return () => clearInterval(interval)
    }, [phase])

    const formattedTime = formatTime(remaining);
    const timerIsRunning = phase === 'running'

    return (
        <View style={styles.container}>
            {/* Switch mode section */}
            <ModeSwitcher
                currentMode={currentMode}
                onChange={(newMode) => dispatch(changeMode(newMode))}
            />

            {/* Timer display */}
            <TimerDisplay time={formattedTime} />

            {/* Timer status indicator */}
            <TimerStatusIndicator timerIsRunning={timerIsRunning} />

            {/* Action buttons: Reset, Play/Pause, Skip */}
            <ActionButtons
                timerIsRunning={timerIsRunning}
                onPressReset={() => dispatch(reset())}
                onPressPlayPause={() =>
                    timerIsRunning
                        ? dispatch(pause())
                        : dispatch(start())
                }
                onPressSkip={() => dispatch(skip())}
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
