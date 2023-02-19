import moment, { Duration } from "moment";
import { TrackerObjectType } from "../types/types";

export default function getTimeDistance({
  startedAt,
  stoppedOn,
  isActive,
  resumedAt = 0,
}: TrackerObjectType): Duration {
  const currentDate = Date.now();
  let difference;
  if (isActive) {
    if (!stoppedOn) {
      difference = currentDate - startedAt;
    } else {
      difference =
        currentDate -
        resumedAt +
        moment.duration(stoppedOn, "milliseconds").asMilliseconds();
    }
  } else {
    difference = stoppedOn;
  }
  const duration = moment.duration(difference, "milliseconds");
  return duration;
}
