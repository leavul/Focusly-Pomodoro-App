import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from '../../../ui/AppButton'
import AppText from '../../../ui/AppText'
import { colors, spacing } from '../../../../theme'
import { s } from 'react-native-size-matters'


type PomodoroModalButtonProps = {
    confirmLabel?: string,
    onConfirm: () => void
    onCancel: () => void
}
const PomodoroModalButton = ({ confirmLabel = 'Confirm', onConfirm, onCancel }: PomodoroModalButtonProps) => {
    return (
        <View style={styles.container}>
            <AppButton
                style={{ flex: 1 }}
                onPress={onCancel}>
                <AppText>Cancel</AppText>
            </AppButton>

            <AppButton
                backgroundColor={colors.primary}
                onPress={onConfirm}
            >
                <AppText>{confirmLabel}</AppText>
            </AppButton>
        </View>
    )
}

export default PomodoroModalButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: s(spacing.sm),
    },
})