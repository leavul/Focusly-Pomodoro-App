import { Modal, ModalProps, StyleSheet, View } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { colors, fonts, radius, spacing } from '../../theme'
import { s, vs } from 'react-native-size-matters'
import AppText from '../ui/AppText'

type AppModalProps = ModalProps & {
  visible: boolean
  title: string
  subtitle?: string
  actionButtons?: ReactNode
}

const AppModal = ({
  visible,
  title,
  subtitle,
  children,
  ...props
}: AppModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      {...props}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <AppText style={styles.title}>{title}</AppText>

          {
            subtitle &&
            <AppText style={styles.subtitle}>{subtitle}</AppText>
          }

          <View style={styles.actionButtons}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalOverlay,
  },
  modal: {
    width: '85%',
    paddingHorizontal: s(spacing.lg),
    paddingVertical: vs(spacing.md),
    borderRadius: s(radius.regular),
    backgroundColor: colors.background,
  },
  title: {
    textAlign: 'center',
    fontSize: s(20),
    fontFamily: fonts.bold,
  },
  subtitle: {
    marginTop: vs(spacing.sm),
    textAlign: 'center',
  },
  actionButtons: {
    marginTop: vs(spacing.md),
  }
})
