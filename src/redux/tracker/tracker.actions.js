import { createAction } from "@reduxjs/toolkit";

const createTracker = createAction("tracker/create");
const startTracker = createAction("tracker/start");
const stopTracker = createAction("tracker/stop");
const resumeTracker = createAction("tracker/resume");
const removeTracker = createAction("tracker/remove");

export { createTracker, startTracker, stopTracker, removeTracker, resumeTracker };
