import { TrackerListType } from '../types/types';

const reduxPersistedTrackersMigration = (): TrackerListType | undefined => {
  const key = 'persist:trackers';
  const persistedObjectString = localStorage.getItem(key);
  if (!persistedObjectString) {
    return;
  }
  try {
    const persistedObject: { trackers: string } = JSON.parse(
      persistedObjectString
    );
    const trackers: TrackerListType | null = persistedObject?.trackers
      ? JSON.parse(persistedObject?.trackers)
      : null;
    if (!Array.isArray(trackers)) {
      return;
    }
    localStorage.removeItem(key);

    return trackers;
  } catch (err) {
    console.error(err);
  }
};

export default reduxPersistedTrackersMigration;
