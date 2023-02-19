import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  removeTracker,
  resumeTracker,
  stopTracker,
} from "../../../redux/tracker/tracker.actions";
import { getTrackerByIdSelector } from "../../../redux/tracker/tracker.selectors";
import formatDate from "../../../utils/formatDate";
import getTimeDistance from "../../../utils/getTimeDistance";
import styles from "./TrackerItem.module.css";
import CircleButton from "../../../common/Button/CircleButton";
import { TrackerObjectType } from "../../../types/types";
import { Duration } from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";

interface IProps {
  id: TrackerObjectType["id"];
  order: number;
}

const TrackerItem: React.FC<IProps> = ({ id, order }) => {
  const [timeDistance, setTimeDistance] = useState<Duration | null>(null);
  const [timeDistanceNumbered, setTimeDistanceNumbered] = useState<
    string | null
  >();
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const trackerObj: TrackerObjectType | null = useAppSelector(
    getTrackerByIdSelector(id)
  );
  const dispatch = useAppDispatch();
  if (!trackerObj) {
    return null;
  }

  const { name, isActive, stoppedOnParsed } = trackerObj;
  const trackerActivityToggler = (): void => {
    isActive && timeDistance && timeDistanceNumbered
      ? dispatch(
          stopTracker({
            id,
            timeDistance: timeDistance.toString(),
            timeDistanceNumbered,
          })
        )
      : dispatch(resumeTracker(id));
  };
  const deleteTrackerHandler = (): void => {
    dispatch(removeTracker(id));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!trackerObj) {
      return;
    }

    if (!isActive) {
      timeDistanceNumbered
        ? clearInterval(timerRef.current as NodeJS.Timer)
        : setTimeDistanceNumbered(stoppedOnParsed);
      return;
    }
    timerRef.current = setInterval(() => {
      const distance = getTimeDistance(trackerObj);
      setTimeDistance(distance);
      setTimeDistanceNumbered(formatDate(distance));
    }, 1000);
  }, [isActive]);

  return (
    <li className={classNames([styles.container, isActive && styles.active])}>
      <div className={styles.trackerName}>
        #{order}.&ensp;{name}
      </div>
      <div className={styles.rightContainer}>
        <span>{timeDistanceNumbered ? timeDistanceNumbered : "Loading..."}</span>
        <CircleButton
          name={isActive ? "pauseButton" : "resumeButton"}
          onClick={trackerActivityToggler}
        />
        <CircleButton name="deleteButton" onClick={deleteTrackerHandler} />
      </div>
    </li>
  );
};

export default TrackerItem;
