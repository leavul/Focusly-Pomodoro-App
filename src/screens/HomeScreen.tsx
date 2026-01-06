import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    TimerStatusIndicator,
    ActionButtons,
    WorkIndicator
} from '../components/pomodoro'
import { RootState } from '../store';
import {
    changeMode,
    start,
    pause,
    tick,
    reset,
    skip,
    clearTimerCompleted,
} from '../store/slices/pomodoroSlice';
import { View, StyleSheet } from 'react-native'
import { formatTime } from '../utils';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const {
        timerStatus,
        mode: currentMode,
        remaining,
        completedWork
    } = useSelector((state: RootState) => state.pomodoro)

    useEffect(() => {
        if (timerStatus === 'running') {
            const interval = setInterval(() => {
                dispatch(tick())
            }, 1000)

            return () => clearInterval(interval)
        }

        if (timerStatus === 'completed') {
            console.log('Timer completed')
            // TODO: Trigger Model and play sound here, to inform the user that the timer has finished

            dispatch(clearTimerCompleted())
        }
    }, [timerStatus])

    const formattedTime = formatTime(remaining);
    const timerIsRunning = timerStatus === 'running'

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

            {/* Work indicator */}
            <WorkIndicator completedWork={completedWork} />
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
