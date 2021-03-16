import React from "react";
import TrackerItem from "../TrackerItem/TrackerItem";
import { useSelector } from "react-redux";
import { getAllTrackersSelector } from "../../../redux/tracker/tracker.selectors";
import styles from './TrackerList.module.css';

export default function TrackerList() {
    const trackersList = useSelector(getAllTrackersSelector);
    return (
        <>
            {trackersList.length ? (
                <ul className={styles.container}>
                    {trackersList.map((item, index) => (
                        <TrackerItem
                            key={item.id}
                            id={item.id}
                            order={index + 1}
                        />
                    ))}
                </ul>
            ) : (
                <p>There is not added trackers</p>
            )}
        </>
    );
}
