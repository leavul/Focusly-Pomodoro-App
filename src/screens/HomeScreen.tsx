import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import AppText from '../components/ui/AppText'
import { s, vs } from 'react-native-size-matters'
import { colors, radius, spacing } from '../theme'
import AppButton from '../components/ui/AppButton'
import { PlayIcon, ResumeIcon, SkipIcon } from '../components/svg'

type Mode = "work" | "break" | "longBreak";
const HomeScreen = () => {

    const [mode, setMode] = useState<Mode>("work");
    return (
        // Switch mode buttons
        <View style={styles.container}>
            <View style={styles.modeContainer}>
                {/* Work mode */}
                <Pressable
                    style={[styles.modeButton, mode === "work" && styles.active]}
                    onPress={() => setMode("work")}
                >
                    <AppText>Work</AppText>
                </Pressable>

                {/* Break mode */}
                <Pressable
                    style={[styles.modeButton, mode === "break" && styles.active]}
                    onPress={() => setMode("break")}
                >
                    <AppText>Break</AppText>
                </Pressable>

                {/* Long break mode */}
                <Pressable
                    style={[styles.modeButton, mode === "longBreak" && styles.active]}
                    onPress={() => setMode("longBreak")}
                >
                    <AppText>Long Break</AppText>
                </Pressable>
            </View>
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
    modeContainer: {
        flexDirection: 'row',
        backgroundColor: colors.muted,
        padding: s(spacing.sm),
        borderRadius: s(radius.full),
        gap: s(spacing.sm)
    },
    modeButton: {
        paddingVertical: vs(spacing.sm),
        paddingHorizontal: s(spacing.md),
        borderRadius: s(radius.full),
    },
    active: {
        backgroundColor: colors.surface,
    },
    timerText: {
        marginTop: vs(spacing.xl),
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