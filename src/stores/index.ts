import TrackersStore from './trackers.store';
import UIStore from './ui.store';

class RootStore {
  trackers = new TrackersStore();
  ui = new UIStore();
}

export default RootStore;
