function normalizeNumber(number) {
    const stringifiedNumber = number.toString();
    return stringifiedNumber.length === 1
        ? 0 + stringifiedNumber
        : stringifiedNumber;
}

export default function formatDate(duration) {
    const days = duration.days();
    const hours = duration.hours() + 24 * days;
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${normalizeNumber(hours)}:${normalizeNumber(
        minutes
    )}:${normalizeNumber(seconds)}`;
}
