declare global {
  interface Window {
    electronService:
      | {
          addOnLoadListener: (
            cb: (
              event: object,
              payload: {
                trackers: TrackerListType;
              }
            ) => void
          ) => void;
          addNotificationsListener: (
            cb: (
              event: object,
              payload: {
                text: string;
              }
            ) => void
          ) => void;
          addOnResetDataListener: (cb: () => void) => void;
          removeGlobalListeners: () => void;
          sendRestoreAppMessage: () => void;
          sendUpdateTrackersListEvent: (trackersList: TrackerListType) => void;
        }
      | undefined;
  }
}

type TrackerObjectType = {
  id: string;
  name: string;
  isActive: boolean;
  startedAt: number;
  stoppedOn: string | null;
  resumedAt?: number;
  stoppedOnParsed?: string;
};

type TrackerListType = TrackerObjectType[];

export { TrackerObjectType, TrackerListType };
