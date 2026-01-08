import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    TimerStatusIndicator,
    ActionButtons,
    FocusIndicator,
    ConfirmChangeModeModal,
    TimerCompletedModal
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
import { useAlertSound } from '../hooks';
import { Mode, MODE_DURATION } from '../types/pomodoro';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const {
        timerStatus,
        mode: currentMode,
        remaining,
        focusCount
    } = useSelector((state: RootState) => state.pomodoro)

    const [timerCompletedModalVisible, setTimerCompletedModalVisible] = useState(false)

    const [confirmChangeModeModalVisible, setConfirmChangeModeModalVisible] = useState(false)
    const [modeToChange, setModeToChange] = useState<null | Mode>(null)

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

    
    const requestModeChange = (newMode: Mode) => {
        if (newMode === currentMode) return
        if (timerMoved) {
            setModeToChange(newMode)
            setConfirmChangeModeModalVisible(true)
        } else {
            dispatch(changeMode(newMode))
        }
    }
    
    const onConformChangeMode = () => {
        if (modeToChange) {
            dispatch(changeMode(modeToChange))
            setModeToChange(null)
        }
        setConfirmChangeModeModalVisible(false)
    }
    
    const onCancelChangeMode = () => {
        setModeToChange(null)
        setConfirmChangeModeModalVisible(false)
    }
    
    const onCloseEndSessionModal = () => {
        setTimerCompletedModalVisible(false)
        dispatch(moveToNextSession())
    }
    
    const formattedTime = formatTime(remaining);
    const timerIsRunning = timerStatus === 'running'
    const timerMoved = remaining !== MODE_DURATION[currentMode]
    
    return (
        <View style={styles.container}>
            {/* Switch mode section */}
            <ModeSwitcher
                currentMode={currentMode}
                focusCount={focusCount}
                onChange={requestModeChange}
            />

            {/* Timer display */}
            <TimerDisplay time={formattedTime} />

            {/* Timer status indicator */}
            <TimerStatusIndicator timerIsRunning={timerIsRunning} />

            {/* Action buttons: Reset, Play/Pause, Skip */}
            <ActionButtons
                timerIsRunning={timerIsRunning}
                disabledRest={!timerMoved}
                onPressReset={() => dispatch(reset())}
                onPressPlayPause={() =>
                    timerIsRunning
                        ? dispatch(pause())
                        : dispatch(start())
                }
                disabledSkip={!timerIsRunning}
                onPressSkip={() => dispatch(moveToNextSession())}
            />

            {/* Focus indicator */}
            <FocusIndicator focusCount={focusCount} />

            {/* Conform change mode modal */}
            <ConfirmChangeModeModal
                visible={confirmChangeModeModalVisible}
                onConfirm={onConformChangeMode}
                onCancel={onCancelChangeMode}
            />

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
