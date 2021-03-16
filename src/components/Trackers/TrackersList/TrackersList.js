import React from "react";
import TrackerItem from "../TrackerItem/TrackerItem";
import { useSelector } from "react-redux";
import { getAllTrackersSelector } from "../../../redux/tracker/tracker.selectors";

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
