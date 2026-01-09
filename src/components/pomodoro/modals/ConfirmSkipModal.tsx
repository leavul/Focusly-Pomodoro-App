import AppModal from '../../ui/AppModal'
import PomodoroModalButton from './shared/PomodoroModalButton'

type ConfirmSkipModalProps = {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmSkipModal = ({
    visible,
    onConfirm,
    onCancel,
}: ConfirmSkipModalProps) => {
    return (
        <AppModal
            visible={visible}
            title="Skip The Session?"
            subtitle="The current session will mark as completed if you press skip"
        >

            <PomodoroModalButton
                confirmLabel='Skip'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmSkipModal
