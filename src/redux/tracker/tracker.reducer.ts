import {
  combineReducers,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { TrackerListType, TrackerObjectType } from '../../types/types';
import newTracker from '../../utils/trackerObjectCreator';

type IdType = TrackerObjectType['id'];

const initialState: TrackerListType = [];

const trackersSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    setTrackers: (_, { payload }: PayloadAction<TrackerListType>) => {
      return payload;
    },
    createTracker: (
      state,
      { payload: name }: PayloadAction<TrackerObjectType['name']>
    ) => {
      const newObject = newTracker(name);
      return [...state, newObject];
    },
    stopTracker: (
      state,
      {
        payload: { id, timeDistance, timeDistanceNumbered },
      }: PayloadAction<{
        id: IdType;
        timeDistance: string;
        timeDistanceNumbered: string;
      }>
    ) => {
      const currentTracker = state.find((tracker) => tracker.id === id);
      if (!currentTracker) {
        return;
      }
      const updatedTracker: TrackerObjectType = {
        ...currentTracker,
        stoppedOn: timeDistance,
        stoppedOnParsed: timeDistanceNumbered,
        isActive: false,
      };
      const trackers = state.filter((tracker) => tracker.id !== id);
      return [...trackers, updatedTracker];
    },
    resumeTracker: (state, { payload: id }: PayloadAction<IdType>) => {
      const currentTracker = state.find((tracker) => tracker.id === id);
      if (!currentTracker) {
        return;
      }
      const updatedTracker: TrackerObjectType = {
        ...currentTracker,
        isActive: true,
        resumedAt: Date.now(),
      };
      const trackers = state.filter((tracker) => tracker.id !== id);
      return [...trackers, updatedTracker];
    },
    removeTracker: (state, { payload: id }: PayloadAction<IdType>) =>
      state.filter((tracker) => tracker.id !== id),
  },
});

const trackerActions = trackersSlice.actions;

const isStateConfigured = createReducer(false, {
  [trackerActions.setTrackers.toString()]: () => true,
});

const reducer = combineReducers({
  trackers: trackersSlice.reducer,
  isStateConfigured,
});

export { trackerActions };
export default reducer;
