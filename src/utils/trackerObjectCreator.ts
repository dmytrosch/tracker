import moment from "moment";
import { v4 as uuid } from "uuid";
import { TrackerObjectType } from "../types/types";

//creating w/o prototype inherit of class
export default function trackerCreator(name: string): TrackerObjectType {
  return {
    id: uuid(),
    name: name
      ? name
      : `Tracker started at ${moment().format("kk:mm:ss DD.MM.YYYY")}`,
    isActive: true,
    startedAt: Date.now(),
    stoppedOn: null,
  };
}
