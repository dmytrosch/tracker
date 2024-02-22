import trackerStore from './tracker.store';

class RootStore {
  tracker = trackerStore;
}

export default new RootStore();
