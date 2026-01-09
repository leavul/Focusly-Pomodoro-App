import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import {
    ModeSwitcher,
    TimerDisplay,
    ActionButtons,
    FocusIndicator,
    ConfirmChangeModeModal,
    TimerCompletedModal,
    ConfirmRestSessionModal,
    ConfirmSkipSessionModal
} from '../components/pomodoro'
import { RootState } from '../store';
import {
    changeSessionMode,
    startTimer,
    pauseTimer,
    tickTimer,
    resetTimer,
    moveToNextSessionMode,
} from '../store/slices/pomodoroSlice';
import { View, StyleSheet } from 'react-native'
import { formatTime } from '../utils';
import { useAlertSound } from '../hooks';
import { Mode, MODE_DURATION } from '../types/pomodoro';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const {
        timerStatus,
        sessionMode: currentSessionMode,
        remainingTime,
        focusCount
    } = useSelector((state: RootState) => state.pomodoro)

    const [timerCompletedModalVisible, setTimerCompletedModalVisible] = useState(false)

    const [confirmChangeModeModalVisible, setConfirmChangeModeModalVisible] = useState(false)
    const [modeToChange, setModeToChange] = useState<null | Mode>(null)

    const [confirmRestModalVisible, setConfirmRestSessionModalVisible] = useState(false)
    const [confirmSkipModalVisible, setConfirmSkipSessionModalVisible] = useState(false)

    const { playSound } = useAlertSound()

    useEffect(() => {
        if (timerStatus === 'running') {
            activateKeepAwakeAsync();

            const interval = setInterval(() => {
                dispatch(tickTimer())
            }, 1000)

            return () => clearInterval(interval)
        }

        if (timerStatus === 'completed') {
            deactivateKeepAwake();

            playSound()
            setTimerCompletedModalVisible(true)
        }

        if (timerStatus === 'paused') {
            deactivateKeepAwake();
        }
    }, [timerStatus])


    const requestModeChange = (newMode: Mode) => {
        if (newMode === currentSessionMode) return

        // dispatch(pause())

        if (timerMoved) {
            setModeToChange(newMode)
            setConfirmChangeModeModalVisible(true)
        } else {
            dispatch(changeSessionMode(newMode))
        }
    }

    const onConfirmChangeMode = () => {
        if (modeToChange) {
            dispatch(changeSessionMode(modeToChange))
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
            ? dispatch(pauseTimer())
            : dispatch(startTimer())
    }

    const requestRestSession = () => {
        // dispatch(pause())
        setConfirmRestSessionModalVisible(true)
    }

    const onConfirmRestSession = () => {
        setConfirmRestSessionModalVisible(false)
        dispatch(resetTimer())
    }

    const requestSkipSession = () => {
        // dispatch(pause())
        setConfirmSkipSessionModalVisible(true)
    }

    const onConfirmSkipSession = () => {
        setConfirmSkipSessionModalVisible(false)
        dispatch(moveToNextSessionMode())
    }

    const onCloseTimerCompletedModal = () => {
        setTimerCompletedModalVisible(false)
        dispatch(moveToNextSessionMode())
    }

    const formattedRemainingTime = formatTime(remainingTime);
    const timerIsRunning = timerStatus === 'running'
    const timerMoved = remainingTime !== MODE_DURATION[currentSessionMode]

    return (
        <View style={styles.container}>
            {/* Switch mode section */}
            <ModeSwitcher
                currentMode={currentSessionMode}
                focusCount={focusCount}
                onChange={requestModeChange}
            />

            {/* Timer display */}
            <TimerDisplay
                remainingTime={formattedRemainingTime}
                timerIsRunning={timerIsRunning}
            />

            {/* Action buttons: Reset, Play/Pause, Skip */}
            <ActionButtons
                timerIsRunning={timerIsRunning}
                disabledRest={!timerMoved}
                onPressReset={requestRestSession}
                onPressPlayPause={handelPlayPause}
                onPressSkip={requestSkipSession}
            />

            {/* Focus indicator */}
            <FocusIndicator focusCount={focusCount} />

            {/* Conform change mode modal */}
            <ConfirmChangeModeModal
                visible={confirmChangeModeModalVisible}
                onConfirm={onConfirmChangeMode}
                onCancel={onCancelChangeMode}
            />

            {/* Conform rest modal */}
            <ConfirmRestSessionModal
                visible={confirmRestModalVisible}
                onConfirm={onConfirmRestSession}
                onCancel={() => setConfirmRestSessionModalVisible(false)}
            />

            {/* Conform skip modal */}
            <ConfirmSkipSessionModal
                visible={confirmSkipModalVisible}
                onConfirm={onConfirmSkipSession}
                onCancel={() => setConfirmSkipSessionModalVisible(false)}
            />

            {/* Timer completed modal */}
            <TimerCompletedModal
                visible={timerCompletedModalVisible}
                onClose={() => onCloseTimerCompletedModal()}
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
