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
import styles from "./TrackerItem.module.css";
import CircleButton from "../../../common/Button/CircleButton";
import showNotification from "../../../utils/showNotification";

export default function TrackerItem({ id, order }) {
    const [timeDistance, setTimeDistance] = useState(null);
    const [timeDistanceNumbered, setTimeDistanceNumbered] = useState();
    const timerRef = useRef(null);
    const trackerObj = useSelector(getTrackerByIdSelector(id));
    const { name, isActive, stoppedOnParsed } = trackerObj;
    const dispatch = useDispatch();
    const trackerActivityToggler = () => {
        if (isActive) {
            dispatch(
                stopTracker({
                    id,
                    timeDistance: timeDistance.toString(),
                    timeDistanceNumbered,
                })
            );
            showNotification(`A tracker "${name}" stopped!`);
        } else {
            dispatch(resumeTracker(id));
            showNotification(`A tracker "${name}" resumed!`);
        }
    };
    const deleteTrackerHandler = () => {
        dispatch(removeTracker(id));
        showNotification(`A tracker "${name}" removed!`);
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
            <div className={styles.trackerName}>
                #{order}.&ensp;{name}
            </div>
            <div className={styles.rightContainer}>
                <span>
                    {timeDistanceNumbered ? timeDistanceNumbered : "00:00:00"}
                </span>
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
