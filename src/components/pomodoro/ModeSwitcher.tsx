import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '../ui/AppText'
import { Mode } from './types';
import { colors, radius, spacing } from '../../theme';
import { s, vs } from 'react-native-size-matters';

type ModeSwitcherProps = {
    mode: Mode;
    onChange: (mode: Mode) => void;
};

const ModeSwitcher = ({ mode, onChange }: ModeSwitcherProps) => {
    return (
        <View style={styles.container}>
            {/* Work mode */}
            <Pressable
                style={[styles.modeButton, mode === 'work' && styles.active]}
                onPress={() => onChange('work')}
            >
                <AppText>Work</AppText>
            </Pressable>

            {/* Break mode */}
            <Pressable
                style={[styles.modeButton, mode === 'break' && styles.active]}
                onPress={() => onChange('break')}
            >
                <AppText>Break</AppText>
            </Pressable>

            {/* Long break mode */}
            <Pressable
                style={[styles.modeButton, mode === 'longBreak' && styles.active]}
                onPress={() => onChange('longBreak')}
            >
                <AppText>Long Break</AppText>
            </Pressable>
        </View>
    )
}

export default ModeSwitcher

const styles = StyleSheet.create({
    container: {
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
})