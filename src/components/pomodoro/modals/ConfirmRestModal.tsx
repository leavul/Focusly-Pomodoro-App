import AppModal from '../../ui/AppModal'
import PomodoroModalButton from './shared/PomodoroModalButton'

type ConfirmRestModalProps = {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmRestModal = ({
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

            <PomodoroModalButton
                confirmLabel='Rest'
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </AppModal>
    )
}

export default ConfirmRestModal