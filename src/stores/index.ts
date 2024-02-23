import TrackersStore from './trackers.store';

class RootStore {
  trackers = new TrackersStore();
}

export default RootStore;
