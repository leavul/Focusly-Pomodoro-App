import React from 'react'
import AppButton from '../../ui/AppButton'
import AppText from '../../ui/AppText'
import { colors } from '../../../theme'
import AppModal from '../../ui/AppModal'

type TimerCompletedModalProps = {
  visible: boolean
  onClose: () => void
}

const TimerCompletedModal = ({
  visible,
  onClose,
}: TimerCompletedModalProps) => {
  return (
    <AppModal
      visible={visible}
      title="Timer Completed"
    >
      <AppButton
        backgroundColor={colors.primary}
        onPress={onClose}
      >
        <AppText>Continue</AppText>
      </AppButton>
    </AppModal>
  )
}

export default TimerCompletedModal

