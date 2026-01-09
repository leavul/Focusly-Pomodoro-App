import AppModal from '../../ui/AppModal'
import PomodoroModalButtons from './shared/PomodoroModalButtons'

type ConfirmRestModalProps = {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmRestSessionModal = ({
    visible,
    onConfirm,
    onCancel,
}: ConfirmRestModalProps) => {
    return (
        <AppModal
            visible={visible}
            title="Reset The Timer?"
            subtitle="The current session will be reset to its original time if you press reset"
        >

            <PomodoroModalButtons
                confirmLabel='Rest'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmRestSessionModal