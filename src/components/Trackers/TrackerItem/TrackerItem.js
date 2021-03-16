import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    removeTracker,
    resumeTracker,
    stopTracker,
} from "../../../redux/tracker/tracker.actions";
import { getTrackerByIdSelector } from "../../../redux/tracker/tracker.selectors";
import formatDate from "../../../utils/formatDate";
import getTimeDistance from "../../../utils/getTimeDistance";

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
        <li>
            <span>{name}</span>
            <span>{timeDistanceNumbered}</span>
            {isActive ? (
                <button onClick={trackerActivityToggler}>Stop</button>
            ) : (
                <button onClick={trackerActivityToggler}>Start</button>
            )}

            <button onClick={deleteTrackerHandler}>Del</button>
        </li>
    );
}
