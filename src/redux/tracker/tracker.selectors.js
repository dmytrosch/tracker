const getAllTrackersSelector = (state) => {
    const arr = [...state.app.trackers];
    return arr.sort((a, b) => b.startedAt - a.startedAt);
};

const getTrackerByIdSelector = (id) => (state) =>
    state.app.trackers.find((tracker) => tracker.id === id);

export { getAllTrackersSelector, getTrackerByIdSelector };
