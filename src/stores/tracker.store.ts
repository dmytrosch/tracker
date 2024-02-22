import { makeAutoObservable } from 'mobx';
import { TrackerListType, TrackerObjectType } from '../types/types';
import newTracker from '../utils/trackerObjectCreator';

type IdType = TrackerObjectType['id'];

class TrackerStore {
  tracker: TrackerListType = [];

  constructor() {
    makeAutoObservable(this);
  }

  private findTrackerById(id: IdType): TrackerObjectType | undefined {
    return this.tracker.find((tracker) => tracker.id === id);
  }

  private updateExistingTracker(updatedTracker: TrackerObjectType): void {
    const trackers = this.tracker.filter(
      (tracker) => tracker.id !== updatedTracker.id
    );
    this.tracker = [...trackers, updatedTracker];
  }

  createTracker(name: TrackerObjectType['name']): void {
    const newObject = newTracker(name);
    this.tracker = [...this.tracker, newObject];
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

  removeTracker(id: IdType): void {
    this.tracker = this.tracker.filter((tracker) => tracker.id !== id);
  }
}

export default new TrackerStore();
