import { createAction } from "@reduxjs/toolkit";

const createTracker = createAction("tracker/create");
const stopTracker = createAction("tracker/stop");
const resumeTracker = createAction("tracker/resume");
const removeTracker = createAction("tracker/remove");
const setTrackers = createAction("trackers/set")

export { createTracker, stopTracker, removeTracker, resumeTracker, setTrackers };
