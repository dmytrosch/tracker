import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
    removeTracker,
    resumeTracker,
    stopTracker,
} from "../../../redux/tracker/tracker.actions";
import { getTrackerByIdSelector } from "../../../redux/tracker/tracker.selectors";
import formatDate from "../../../utils/formatDate";
import getTimeDistance from "../../../utils/getTimeDistance";
import { ReactComponent as Pause } from "../../../assets/pause_circle_outline-24px.svg";
import styles from "./TrackerItem.module.css";
import CircleButton from "../../../common/Button/CircleButton";

export default function TrackerItem({ id }) {
    const [timeDistance, setTimeDistance] = useState(null);
    const [timeDistanceNumbered, setTimeDistanceNumbered] = useState(null);
    const timerRef = useRef(null);
    const trackerObj = useSelector(getTrackerByIdSelector(id));
    const { name, isActive, stoppedOnParsed } = trackerObj;
    const dispatch = useDispatch();
    const trackerActivityToggler = () => {
        isActive
            ? dispatch(
                  stopTracker({
                      id,
                      timeDistance: timeDistance.toString(),
                      timeDistanceNumbered,
                  })
              )
            : dispatch(resumeTracker(id));
    };
    const deleteTrackerHandler = () => {
        dispatch(removeTracker(id));
    };
    useEffect(() => {
        if (!isActive) {
            timeDistanceNumbered
                ? clearInterval(timerRef.current)
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
        <li
            className={classNames([
                styles.container,
                isActive && styles.active,
            ])}
        >
            <span>{name}</span>
            <span>{timeDistanceNumbered}</span>
            <div className={styles.buttons}>
                <CircleButton
                    name={isActive ? "pauseButton" : "resumeButton"}
                    onClick={trackerActivityToggler}
                />
                <CircleButton
                    name="deleteButton"
                    onClick={deleteTrackerHandler}
                />
            </div>
        </li>
    );
}
