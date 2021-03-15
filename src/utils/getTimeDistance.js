import moment from "moment";

function normalizeNumber(number) {
    const stringifiedNumber = number.toString();
    return stringifiedNumber.length === 1
        ? 0 + stringifiedNumber
        : stringifiedNumber;
}

function formatDate(duration) {
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${normalizeNumber(hours)}:${normalizeNumber(minutes)}:${normalizeNumber(seconds)}`;
}

export default function getTimeDistance(startedAt, stoppedAt) {
    if (!stoppedAt) {
        const currentDate = Date.now();
        const difference = currentDate - startedAt;
        const duration = moment.duration(difference, "milliseconds");

        return formatDate(duration);
    }
}
