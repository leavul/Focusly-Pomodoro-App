import AppModal from '../../ui/AppModal'
import PomodoroModalButtons from './shared/PomodoroModalButtons'

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
            <PomodoroModalButtons
                confirmLabel='Change'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmChangeModeModal
