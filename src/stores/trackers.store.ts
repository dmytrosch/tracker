import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { TrackerListType, TrackerObjectType } from '../types/types';
import newTracker from '../utils/trackerObjectCreator';
import { isElectron } from '../constants';
import reduxPersistedTrackersMigration from '../utils/reduxPersistedTrackersMigration';

type IdType = TrackerObjectType['id'];

class TrackersStore {
  trackers: TrackerListType = [];
  isStateConfigured?;

  constructor() {
    if (isElectron) {
      this.isStateConfigured = false;
    } else {
      const savedTrackers = reduxPersistedTrackersMigration();
      if (savedTrackers) {
        this.trackers = savedTrackers;
      }
      makePersistable(this, {
        storage: window.localStorage,
        name: 'mobx:store',
        properties: ['trackers'],
      });
    }

    makeAutoObservable(this);
  }

  private updateExistingTracker(updatedTracker: TrackerObjectType): void {
    this.trackers = this.trackers.map((tracker) => {
      if (tracker.id !== updatedTracker.id) {
        return tracker;
      }
      return updatedTracker;
    });
  }

  findTrackerById(id: IdType): TrackerObjectType | undefined {
    return this.trackers.find((tracker) => tracker.id === id);
  }

  createTracker(name: TrackerObjectType['name'] | null = null): void {
    const newObject = newTracker(name);

    this.trackers = [...this.trackers, newObject];
  }

  stopTracker({
    id,
    timeDistance,
    timeDistanceNumbered,
  }: {
    id: IdType;
    timeDistance: string;
    timeDistanceNumbered: string;
  }): void {
    const currentTracker = this.findTrackerById(id);
    if (!currentTracker) {
      return;
    }
    const updatedTracker: TrackerObjectType = {
      ...currentTracker,
      stoppedOn: timeDistance,
      stoppedOnParsed: timeDistanceNumbered,
      isActive: false,
    };
    this.updateExistingTracker(updatedTracker);
  }

  resumeTracker(id: IdType): void {
    const currentTracker = this.findTrackerById(id);
    if (!currentTracker) {
      return;
    }
    const updatedTracker: TrackerObjectType = {
      ...currentTracker,
      isActive: true,
      resumedAt: Date.now(),
    };
    this.updateExistingTracker(updatedTracker);
  }

  setTrackers(trackers: TrackerListType): void {
    this.trackers = trackers;
  }

  clearTrackers(): void {
    this.trackers = [];
  }

  removeTracker(id: IdType): void {
    this.trackers = this.trackers.filter((tracker) => tracker.id !== id);
  }
}

export default TrackersStore;
