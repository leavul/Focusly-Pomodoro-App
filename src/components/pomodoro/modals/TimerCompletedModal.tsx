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
      title="Time's Up!"
      subtitle='Your session has finished'
    >
      <AppButton
        backgroundColor={colors.primary}
        onPress={onClose}
      >
        <AppText>Okay</AppText>
      </AppButton>
    </AppModal>
  )
}

export default TimerCompletedModal

