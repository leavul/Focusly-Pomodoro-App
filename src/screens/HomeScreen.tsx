import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    TimerStatusIndicator,
    ActionButtons,
    FocusIndicator,
    ConfirmChangeModeModal,
    TimerCompletedModal,
    ConfirmRestModal,
    ConfirmSkipModal
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
import { useKeepAwake } from 'expo-keep-awake';

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

    const [confirmRestModalVisible, setConfirmRestModalVisible] = useState(false)
    const [confirmSkipModalVisible, setConfirmSkipModalVisible] = useState(false)

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

        dispatch(pause())

        if (timerMoved) {
            setModeToChange(newMode)
            setConfirmChangeModeModalVisible(true)
        } else {
            dispatch(changeMode(newMode))
        }
    }

    const onConfirmChangeMode = () => {
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

    const handelPlayPause = () => {
        timerIsRunning
            ? dispatch(pause())
            : dispatch(start())
    }

    const requestRest = () => {
        dispatch(pause())
        setConfirmRestModalVisible(true)
    }

    const onConfirmRest = () => {
        setConfirmRestModalVisible(false)
        dispatch(reset())
    }

    const requestSkip = () => {
        dispatch(pause())
        setConfirmSkipModalVisible(true)
    }

    const onConfirmSkip = () => {
        setConfirmSkipModalVisible(false)
        dispatch(moveToNextSession())
    }

    const onCloseTimerCompletedModal = () => {
        setTimerCompletedModalVisible(false)
        dispatch(moveToNextSession())
    }

      useKeepAwake();

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
                onPressReset={requestRest}
                onPressPlayPause={handelPlayPause}
                onPressSkip={requestSkip}
            />

            {/* Focus indicator */}
            <FocusIndicator focusCount={focusCount} />

            {/* Timer completed modal */}
            <TimerCompletedModal
                visible={timerCompletedModalVisible}
                onClose={() => onCloseTimerCompletedModal()}
            />

            {/* Conform change mode modal */}
            <ConfirmChangeModeModal
                visible={confirmChangeModeModalVisible}
                onConfirm={onConfirmChangeMode}
                onCancel={onCancelChangeMode}
            />

            {/* Conform rest modal */}
            <ConfirmRestModal
                visible={confirmRestModalVisible}
                onConfirm={onConfirmRest}
                onCancel={() => setConfirmRestModalVisible(false)}
            />

            {/* Conform skip modal */}
            <ConfirmSkipModal
                visible={confirmSkipModalVisible}
                onConfirm={onConfirmSkip}
                onCancel={() => setConfirmSkipModalVisible(false)}
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
