const getAllTrackersSelector = (state) => state.app.trackers;
const getTrackerByIdSelector = (id) => (state) =>
    state.app.trackers.find((tracker) => tracker.id === id);

export { getAllTrackersSelector, getTrackerByIdSelector };
