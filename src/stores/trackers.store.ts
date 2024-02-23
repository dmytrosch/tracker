import { makeAutoObservable } from 'mobx';
import { TrackerListType, TrackerObjectType } from '../types/types';
import newTracker from '../utils/trackerObjectCreator';

type IdType = TrackerObjectType['id'];

class TrackersStore {
  trackers: TrackerListType = [];

  constructor() {
    console.log(this);

    makeAutoObservable(this);
  }

  private updateExistingTracker(updatedTracker: TrackerObjectType): void {
    const trackers = this.trackers.filter(
      (tracker) => tracker.id !== updatedTracker.id
    );
    this.trackers = [...trackers, updatedTracker];
  }

  findTrackerById(id: IdType): TrackerObjectType | undefined {
    return this.trackers.find((tracker) => tracker.id === id);
  }

  createTracker(name: TrackerObjectType['name'] | null = null): void {
    const newObject = newTracker(name);
    console.log(this);

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
