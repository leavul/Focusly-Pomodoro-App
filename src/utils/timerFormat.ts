/**
 * Converts a time value in seconds into a formatted string "MM : SS".
 *
 * Example:
 *   formatTime(75) => "01 : 15"
 *
 * @param seconds - time in seconds
 * @returns formatted string "MM : SS"
 */
export const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")

    const s = (seconds % 60)
        .toString()
        .padStart(2, "0")

    return `${m} : ${s}`
}
