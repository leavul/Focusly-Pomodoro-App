import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppButton from '../ui/AppButton'
import { ResetIcon, PlayIcon, SkipIcon } from '../svg'
import { colors, spacing } from '../../theme'
import { s, vs } from 'react-native-size-matters'
import PauseIcon from '../svg/PauseIcon'

type ActionButtonsProps = {
    timerIsRunning: boolean,
    disableReset: boolean
    onPressReset: () => void
    onPressPlayPauseToggle: () => void
    onPressSkip: () => void
}

const ActionButtons = ({ timerIsRunning, disableReset, onPressReset, onPressPlayPauseToggle, onPressSkip }: ActionButtonsProps) => {
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
                backgroundColor={colors.surface}
                onPress={onPressPlayPauseToggle}
            >
                {
                    timerIsRunning
                        ? <PauseIcon size={28} />
                        : <PlayIcon size={28} />
                }
            </AppButton>

            {/* Skip button */}
            <AppButton
                style={styles.sideButton}
                disabled={!timerIsRunning}
                onPress={onPressSkip}
            >
                <SkipIcon
                    fill={colors.background}
                    size={20}
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

