import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppButton from '../ui/AppButton'
import { ResumeIcon, PlayIcon, SkipIcon } from '../svg'
import { colors, spacing } from '../../theme'
import { s, vs } from 'react-native-size-matters'

const ActionButtons = () => {
    return (
        <View style={styles.container}>
            {/* Resume button */}
            <AppButton
                style={styles.sideButton}
            >
                <ResumeIcon size={20} />
            </AppButton>

            {/* Play button */}
            <AppButton
                padding={34}
                enableBorderWidth={false}
                backgroundColor={colors.surface}
            >
                <PlayIcon size={24} />
            </AppButton>

            {/* Skip button */}
            <AppButton
                style={styles.sideButton}
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
        marginTop: vs(spacing.xl),
        flexDirection: 'row',
        gap: s(spacing.lg)
    },
    sideButton: {
        alignSelf: 'center',
    }
})

