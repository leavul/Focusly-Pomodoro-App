import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppButton from '../../ui/AppButton'
import { ResetIcon, PlayIcon, SkipIcon } from '../../svg'
import { colors, spacing } from '../../../theme'
import { s, vs } from 'react-native-size-matters'
import PauseIcon from '../../svg/PauseIcon'

type ActionButtonsProps = {
    timerIsRunning: boolean
    disabledRest: boolean
    onPressReset: () => void
    onPressPlayPause: () => void
    disabledSkip: boolean
    onPressSkip: () => void
}

const ActionButtons = ({
    timerIsRunning,
    disabledRest,
    onPressReset,
    onPressPlayPause,
    disabledSkip,
    onPressSkip
}: ActionButtonsProps) => {
    return (
        <View style={styles.container}>
            {/* Reset button */}
            <AppButton
                style={styles.sideButton}
                disabled={disabledRest}
                onPress={onPressReset}
            >
                <ResetIcon size={20} />
            </AppButton>

            {/* Play/Pause button */}
            <AppButton
                padding={34}
                enableBorderWidth={false}
                backgroundColor={colors.primary}
                onPress={onPressPlayPause}
            >
                {
                    timerIsRunning
                        ? <PauseIcon size={24} />
                        : <PlayIcon size={24} />
                }
            </AppButton>

            {/* Skip button */}
            <AppButton
                style={styles.sideButton}
                disabled={disabledSkip}
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
        gap: s(spacing.lg),
    },
    sideButton: {
        alignSelf: 'center',
    }
})

