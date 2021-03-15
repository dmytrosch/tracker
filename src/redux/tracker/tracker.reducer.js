import { createReducer } from "@reduxjs/toolkit";
import {
    createTracker,
    startTracker,
    stopTracker,
    removeTracker,
} from "./tracker.actions";

const init = [
    { name: "first tracker", time: "12:58:45" },
    { name: "first tracker", time: "12:58:45" },
    { name: "first tracker", time: "12:58:45" },
];
const trackers = createReducer(init, {
    [createTracker]: (state, { payload }) => {},
});

export default trackers;
