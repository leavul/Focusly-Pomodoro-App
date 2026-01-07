import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    TimerStatusIndicator,
    ActionButtons,
    FocusIndicator
} from '../components/pomodoro'
import { RootState } from '../store';
import {
    changeMode,
    start,
    pause,
    tick,
    reset,
    moveToNextSession,
} from '../store/slices/pomodoroSlice';
import { View, StyleSheet } from 'react-native'
import { formatTime } from '../utils';
import TimerCompletedModal from '../components/pomodoro/TimerCompletedModal';
import { useAlertSound } from '../hooks';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const {
        timerStatus,
        mode,
        remaining,
        focusCount
    } = useSelector((state: RootState) => state.pomodoro)

    const [timerCompletedModalVisible, setTimerCompletedModalVisible] = useState(false)
    const { playSound } = useAlertSound()

    useEffect(() => {
        if (timerStatus === 'running') {
            const interval = setInterval(() => {
                dispatch(tick())
            }, 1000)

            return () => clearInterval(interval)
        }

        if (timerStatus === 'completed') {
            playSound()
            setTimerCompletedModalVisible(true)
        }
    }, [timerStatus])

    const formattedTime = formatTime(remaining);
    const timerIsRunning = timerStatus === 'running'

    const onCloseEndSessionModal = () => {
        setTimerCompletedModalVisible(false)
        dispatch(moveToNextSession())
    }

    return (
        <View style={styles.container}>
            {/* Switch mode section */}
            <ModeSwitcher
                currentMode={mode}
                focusCount={focusCount}
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
                onPressSkip={() => dispatch(moveToNextSession())}
            />

            {/* Focus indicator */}
            <FocusIndicator focusCount={focusCount} />

            {/* Timer completed modal */}
            <TimerCompletedModal
                visible={timerCompletedModalVisible}
                onClose={() => onCloseEndSessionModal()}
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
