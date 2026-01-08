export type Mode = 'focus' | 'shortBreak' | 'longBreak'

export const MODE_DURATION: Record<Mode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
}