import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '../ui/AppText'
import { Mode } from '../../types/pomodoro'
import { colors, radius, spacing } from '../../theme';
import { s, vs } from 'react-native-size-matters';

type ModeSwitcherProps = {
    currentMode: Mode;
    onChange: (mode: Mode) => void;
};

const AVAILABLE_MODES: { key: Mode; label: string }[] = [
    { key: 'work', label: 'Work' },
    { key: 'shortBreak', label: 'Short Break' },
    { key: 'longBreak', label: 'Long Break' },
];

const ModeSwitcher = ({ currentMode, onChange }: ModeSwitcherProps) => {
    return (
        <View style={styles.container}>
            {/* Render Pomodoro modes */}
            {
                AVAILABLE_MODES.map(({ key, label }) => (
                    <Pressable
                        key={key}
                        style={[styles.modeButton, currentMode === key && styles.active]}
                        onPress={() => onChange(key)}
                    >
                        <AppText>{label}</AppText>
                    </Pressable>
                ))
            }
        </View>
    )
}

export default ModeSwitcher

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.muted,
        padding: s(spacing.sm),
        borderRadius: s(radius.full),
    },
    modeButton: {
        paddingVertical: vs(spacing.sm),
        paddingHorizontal: s(spacing.md),
        borderRadius: s(radius.full),
    },
    active: {
        backgroundColor: colors.primary,
    },
})