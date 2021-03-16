import moment from "moment";

export default function getTimeDistance({
    startedAt,
    stoppedOn,
    isActive,
    resumedAt,
}) {
    const currentDate = Date.now();
    let difference;
    if (isActive) {
        if (!stoppedOn) {
            difference = currentDate - startedAt;
        } else {
            difference =
                currentDate -
                resumedAt +
                moment.duration(stoppedOn, "milliseconds");
        }
    } else {
        difference = stoppedOn;
    }
    const duration = moment.duration(difference, "milliseconds");
    return duration;
}
