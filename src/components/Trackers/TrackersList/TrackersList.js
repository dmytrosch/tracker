import React from "react";
import TrackerItem from "../TrackerItem/TrackerItem";
import { useSelector } from "react-redux";
import { getAllTrackersSelector } from "../../../redux/tracker/tracker.selectors";

// const arr = [
//     { name: "first tracker", time: "12:58:45" },
//     { name: "first tracker", time: "12:58:45" },
//     { name: "first tracker", time: "12:58:45" },
// ];

export default function TrackerList() {
    const trackersList = useSelector(getAllTrackersSelector);
    return (
        <>
            {trackersList.length ? (
                <ul>
                    {trackersList.map((item) => (
                        <TrackerItem key={item.id} id={item.id} />
                    ))}
                </ul>
            ) : (
                <p>There is not added trackers</p>
            )}
        </>
    );
}
