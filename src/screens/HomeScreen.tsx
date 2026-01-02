import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../components/ui/AppText'
import { s, vs } from 'react-native-size-matters'
import { colors, spacing } from '../theme'
import { ActionButtons, Mode, ModeSwitcher } from '../components/pomodoro'

const HomeScreen = () => {
    const [mode, setMode] = useState<Mode>("work");
    
    return (
        // Switch mode buttons
        <View style={styles.container}>
            <ModeSwitcher mode={mode}
                onChange={setMode}
            />

            {/* Time */}
            <AppText
                style={styles.timerText}
                variant='timer'
            >
                25 : 00
            </AppText>

            {/* Status */}
            <AppText
                style={styles.statusText}
                color={colors.red}
            >
                P A U S E D
            </AppText>

            {/* Resume, Play and Skip buttons */}
            <ActionButtons />
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
        marginTop: vs(spacing.xl),
    },
    statusText: {
        marginTop: vs(spacing.md)
    },
})