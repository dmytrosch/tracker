import { combineReducers, createReducer } from "@reduxjs/toolkit";
import Tracker from "../../utils/TrackerClass";
import {
    createTracker,
    stopTracker,
    removeTracker,
    resumeTracker,
} from "./tracker.actions";

const trackers = createReducer([], {
    [createTracker]: (state, { payload: name }) => {
        const newObject = new Tracker(name);
        return [...state, newObject];
    },
    [stopTracker]: (state, { payload: { id, timeDistance } }) => {
        const currentTracker = state.find((tracker) => tracker.id === id);
        const updatedTracker = {
            ...currentTracker,
            stoppedOn: timeDistance,
            isActive: false,
        };
        const trackers = state.filter((tracker) => tracker.id !== id);
        return [...trackers, updatedTracker];
    },
    [resumeTracker]: (state, { payload: id }) => {
        const currentTracker = state.find((tracker) => tracker.id === id);
        const updatedTracker = {
            ...currentTracker,
            isActive: true,
            resumedAt: Date.now(),
        };
        const trackers = state.filter((tracker) => tracker.id !== id);
        return [...trackers, updatedTracker];
    },
    [removeTracker]: (state, { payload: id }) =>
        state.filter((tracker) => tracker.id !== id),
});
const reducer = combineReducers({ trackers });

export default reducer;
