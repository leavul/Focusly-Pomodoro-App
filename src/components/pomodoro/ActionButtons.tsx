import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppButton from '../ui/AppButton'
import { ResetIcon, PlayIcon, SkipIcon } from '../svg'
import { colors, spacing } from '../../theme'
import { s, vs } from 'react-native-size-matters'
import PauseIcon from '../svg/PauseIcon'

type ActionButtonsProps = {
    timerIsOff: boolean,
    disableReset: boolean
    onPressReset: () => void
    onPressTogglePlayPause: () => void
    onPressSkip: () => void
}

/**
 * ActionButtons component
 *
 * Three main timer controls for the Pomodoro app:
 * - Reset: resets the current session timer (disabled if already full).
 * - Play/Pause: toggles the timer state.
 * - Skip: immediately ends the current session (disabled if timer is stopped).
 *
 * Props:
 * - timerIsOff: whether the timer is currently stopped.
 * - disableReset: disables the Reset button if true.
 * - onPressReset / onPressTogglePlayPause / onPressSkip: callbacks for the buttons.
 */
const ActionButtons = ({
    timerIsOff,
    disableReset,
    onPressReset,
    onPressTogglePlayPause,
    onPressSkip
}: ActionButtonsProps) => {
    return (
        <View style={styles.container}>
            {/* Reset button */}
            <AppButton
                style={styles.sideButton}
                disabled={disableReset}
                onPress={onPressReset}
            >
                <ResetIcon size={20} />
            </AppButton>

            {/* Play/Pause button */}
            <AppButton
                padding={34}
                enableBorderWidth={false}
                backgroundColor={colors.primary}
                onPress={onPressTogglePlayPause}
            >
                {
                    timerIsOff
                        ? <PlayIcon size={24} />
                        : <PauseIcon size={24} />
                }
            </AppButton>

            {/* Skip button */}
            <AppButton
                style={styles.sideButton}
                disabled={timerIsOff}
                onPress={onPressSkip}
            >
                <SkipIcon
                    size={20}
                    fill={colors.background}
                />
            </AppButton>
        </View>
    )
}

export default ActionButtons

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: vs(spacing.xl),
        gap: s(spacing.lg)
    },
    sideButton: {
        alignSelf: 'center',
    }
})

