const getAllTrackersSelector = (state) => state.trackers;
const getTrackerById = (id) => (state) =>
    state.trackers.find((tracker) => tracker.id === id);

export { getAllTrackersSelector, getTrackerById };
