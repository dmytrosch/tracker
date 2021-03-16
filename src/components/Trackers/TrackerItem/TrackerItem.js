import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    resumeTracker,
    stopTracker,
} from "../../../redux/tracker/tracker.actions";
import { getTrackerByIdSelector } from "../../../redux/tracker/tracker.selectors";
import getTimeDistance from "../../../utils/getTimeDistance";

export default function TrackerItem({ id }) {
    const [timeDistance, setTimeDistance] = useState(null);
    const timerRef = useRef(null);
    const trackerObj = useSelector(getTrackerByIdSelector(id));
    const { name, isActive } = trackerObj;
    const dispatch = useDispatch();
    const trackerActivityToggler = (e) => {
        isActive ? dispatch(stopTracker(id)) : dispatch(resumeTracker(id));
    };
    useEffect(() => {
        if (!isActive) {
            clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(() => {
            const distance = getTimeDistance(trackerObj);
            setTimeDistance(distance);
        }, 1000);
    }, [isActive]);
    return (
        <li>
            <span>{name}</span>
            <span>{timeDistance}</span>
            {isActive ? (
                <button onClick={trackerActivityToggler}>Stop</button>
            ) : (
                <button onClick={trackerActivityToggler}>Start</button>
            )}

            <button>Del</button>
        </li>
    );
}
