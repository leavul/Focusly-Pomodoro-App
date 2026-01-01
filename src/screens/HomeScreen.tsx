import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../components/ui/AppText'
import { s, vs } from 'react-native-size-matters'
import { colors, spacing } from '../theme'
import AppButton from '../components/ui/AppButton'
import { PlayIcon, ResumeIcon, SkipIcon } from '../components/svg'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <AppText
                style={styles.timerText}
                variant='timer'
            >
                25 : 00
            </AppText>
            <AppText
                style={styles.statusText}
                color={colors.red}
            >
                P A U S E D
            </AppText>
            <View style={styles.actionButtonsView}>
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
    timerText: {
        fontSize: 56,
    },
    statusText: {
        marginTop: vs(spacing.md)
    },
    actionButtonsView: {
        marginTop: vs(spacing.xl),
        flexDirection: 'row',
        gap: s(spacing.lg)
    },
    sideButton: {
        alignSelf: 'center',
    }
})