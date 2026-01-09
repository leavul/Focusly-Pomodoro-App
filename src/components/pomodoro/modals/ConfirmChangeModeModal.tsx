import AppModal from '../../ui/AppModal'
import PomodoroModalButton from './shared/PomodoroModalButton'

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
            title="Change The Mode?"
            subtitle="The current session progress will be discarded if you press change"
        >
            <PomodoroModalButton
                confirmLabel='Change'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmChangeModeModal
