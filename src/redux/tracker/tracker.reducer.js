import { combineReducers, createReducer } from "@reduxjs/toolkit";
import Tracker from "../../utils/TrackerClass";
import {
    createTracker,
    startTracker,
    stopTracker,
    removeTracker,
    resumeTracker,
} from "./tracker.actions";

// const init = [
//     {
//         id: "a64b2ff9-86b1-4c5f-be5e-67254fe63d8a",
//         name: "qwe",
//         startedAt:
//             "Date Mon Mar 15 2021 20:44:55 GMT+0200 (Восточная Европа, стандартное время)",
//     },
// ];
const trackers = createReducer([], {
    [createTracker]: (state, { payload: name }) => {
        const newObject = new Tracker(name);
        return [...state, newObject];
    },
    [stopTracker]: (state, { payload: id }) => {
        const currentTracker = state.find((tracker) => tracker.id === id);
        const updatedTracker = {
            ...currentTracker,
            stoppedAt: Date.now(),
            resumeTracker: null,
            isActive: false,
        };
        const trackers = state.filter((tracker) => tracker.id !== id);
        return [...trackers, updatedTracker];
    },
    [resumeTracker]: (state, { payload: id }) => {
        const currentTracker = state.find((tracker) => tracker.id === id);
        const updatedTracker = {
            ...currentTracker,
            stoppedAt: null,
            resumedAt: Date.now(),
            isActive: true,
        };
        const trackers = state.filter((tracker) => tracker.id !== id);
        return [...trackers, updatedTracker];
    },
});
const reducer = combineReducers({ trackers });

export default reducer;
