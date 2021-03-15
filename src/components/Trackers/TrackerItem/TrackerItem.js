import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getTrackerByIdSelector } from "../../../redux/tracker/tracker.selectors";
import getTimeDistance from "../../../utils/getTimeDistance";

export default function TrackerItem({ id }) {
    const [isActive, setIsActive] = useState(true);
    const [timeDistance, setTimeDistance] = useState(null);
    const timerRef = useRef(null);
    const trackerObj = useSelector(getTrackerByIdSelector(id));
    const { name, startedAt, stoppedAt } = trackerObj;
    useEffect(() => {
        if (!isActive) {
            clearInterval(timerRef.current);
            // console.log(timerRef.current);
            return;
        }
        timerRef.current = setInterval(() => {
            const distance = getTimeDistance(startedAt, stoppedAt);
            setTimeDistance(distance);
        }, 1000);
    }, [isActive]);
    return (
        <li>
            <span>{name}</span>
            <span>{timeDistance}</span>
            {isActive ? (
                <button onClick={() => setIsActive(false)}>Stop</button>
            ) : (
                <button onClick={() => setIsActive(true)}>Start</button>
            )}

            <button>Del</button>
        </li>
    );
}
