import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppButton from '../../ui/AppButton'
import AppText from '../../ui/AppText'
import { colors, spacing } from '../../../theme'
import { s, vs } from 'react-native-size-matters'
import AppModal from '../../ui/AppModal'

type ConfirmChangeModeModalProps = {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmChangeModeModal = ({
    visible,
    onConfirm,
    onCancel,
}: ConfirmChangeModeModalProps) => {
    return (
        <AppModal
            visible={visible}
            title="Change Mode?"
            subtitle="The current timer will be reset if you continue"
        >
            <View style={styles.actions}>
                <AppButton
                    style={{ flex: 1 }}
                    onPress={onCancel}>
                    <AppText>Cancel</AppText>
                </AppButton>

                <AppButton
                    backgroundColor={colors.primary}
                    onPress={onConfirm}
                >
                    <AppText>Continue</AppText>
                </AppButton>
            </View>
        </AppModal>
    )
}

export default ConfirmChangeModeModal

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        gap: s(spacing.sm),
    },
})
