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
    return `${normalizeNumber(hours)}:${normalizeNumber(
        minutes
    )}:${normalizeNumber(seconds)}`;
}

export default function getTimeDistance({startedAt, stoppedAt, resumedAt, isActive}) {
    const currentDate = Date.now();
    let difference;

    if (!resumedAt) {
        difference = currentDate - startedAt;
    } else {
        difference = (stoppedAt - startedAt) + (currentDate - resumedAt);
        console.log("diff betw curr and stop", currentDate - stoppedAt);
        console.log("diff betw stop and start", stoppedAt - startedAt);
    }
    const duration = moment.duration(difference, "milliseconds");
    return formatDate(duration);
}
