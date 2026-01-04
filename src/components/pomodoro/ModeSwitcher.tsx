import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '../ui/AppText'
import { Mode } from './types';
import { colors, radius, spacing } from '../../theme';
import { s, vs } from 'react-native-size-matters';

type ModeSwitcherProps = {
    currentMode: Mode;
    onChange: (mode: Mode) => void;
};

const MODES: { key: Mode; label: string }[] = [
    { key: 'work', label: 'Work' },
    { key: 'shortBreak', label: 'Short Break' },
    { key: 'longBreak', label: 'Long Break' },
];

/**
 * ModeSwitcher component
 *
 * Displays buttons to switch between Pomodoro modes:
 * - Work
 * - Short Break
 * - Long Break
 *
 * Props:
 * - currentMode: the active mode.
 * - onChange: callback when a mode button is pressed.
 *
 * Behavior:
 * - Highlights the active mode.
 * - Calls `onChange` with the selected mode when a button is pressed.
 */
const ModeSwitcher = ({ currentMode, onChange }: ModeSwitcherProps) => {
    return (
        <View style={styles.container}>
            {/* Render Pomodoro modes */}
            {MODES.map(({ key, label }) => (
                <Pressable
                    key={key}
                    style={[styles.modeButton, currentMode === key && styles.active]}
                    onPress={() => onChange(key)}
                >
                    <AppText>{label}</AppText>
                </Pressable>
            ))}
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