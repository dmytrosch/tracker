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
