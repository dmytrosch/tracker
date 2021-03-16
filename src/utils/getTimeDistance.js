import moment from "moment";

export default function getTimeDistance({ startedAt, stoppedOn, isActive, resumedAt }) {
    const currentDate = Date.now();
    let difference;

    if (!stoppedOn) {
        difference = currentDate - startedAt;
    } else {
        difference = currentDate - resumedAt + moment.duration(stoppedOn, "milliseconds");
    }
    const duration = moment.duration(difference, "milliseconds");
    return duration;
}
