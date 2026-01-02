import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActionButtons, Mode, ModeSwitcher, StatusDisplay } from '../components/pomodoro'
import TimeDisplay from '../components/pomodoro/TimeDisplay'

const HomeScreen = () => {
    const [mode, setMode] = useState<Mode>("work");

    return (
        // Switch mode buttons
        <View style={styles.container}>
            <ModeSwitcher mode={mode}
                onChange={setMode}
            />

            {/* Time */}
            <TimeDisplay time="25 : 00" />

            {/* Status */}
            <StatusDisplay status="P A U S E D" />

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
})