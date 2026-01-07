import { Modal, ModalProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts, radius, spacing } from '../../theme'
import { s, vs } from 'react-native-size-matters'
import AppText from '../ui/AppText'
import AppButton from '../ui/AppButton'

type EndSessionModalProps = ModalProps & {
    visible: boolean
    onClose: () => void
}

const TimerCompletedModal = ({ visible, onClose, ...props }: EndSessionModalProps) => {
    return (
        <Modal
            visible={visible}
            statusBarTranslucent
            transparent
            animationType={'fade'}
            {...props}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <AppText style={styles.modalText}>
                        Timer Completed
                    </AppText>

                    <AppButton
                        style={styles.modalButton}
                        backgroundColor={colors.primary}
                        onPress={onClose}>
                        <AppText style={styles.buttonText}>
                            Continue
                        </AppText>
                    </AppButton>
                </View>
            </View>
        </Modal >
    )
}

export default TimerCompletedModal

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.modalOverlay
    },
    modal: {
        width: '85%',
        alignSelf: 'center',
        paddingHorizontal: s(spacing.lg),
        paddingVertical: vs(spacing.md),
        borderRadius: s(radius.regular),
        backgroundColor: colors.background,
    },
    modalText: {
        textAlign: 'center',
        fontSize: s(20),
        fontFamily: fonts.bold,
    },
    modalButton: {
        marginTop: vs(spacing.md),
    },
    buttonText: {
        fontSize: s(16),
    }
})