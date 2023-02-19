import { TrackerObjectType } from "../../types/types";
import { RootStoreType } from "../store";

const getAllTrackersSelector = (state: RootStoreType) => {
  console.log(state);

  const arr = [...state.app?.trackers];
  return arr.sort((a, b) => b.startedAt - a.startedAt);
};

const getTrackerByIdSelector =
  (id: TrackerObjectType["id"]) => (state: RootStoreType) =>
    state.app?.trackers.find((tracker) => tracker.id === id) || null;

export { getAllTrackersSelector, getTrackerByIdSelector };
