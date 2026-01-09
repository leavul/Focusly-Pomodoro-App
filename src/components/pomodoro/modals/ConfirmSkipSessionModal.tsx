import AppModal from '../../ui/AppModal'
import PomodoroModalButtons from './shared/PomodoroModalButtons'

type ConfirmSkipModalProps = {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmSkipSessionModal = ({
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

            <PomodoroModalButtons
                confirmLabel='Skip'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmSkipSessionModal
