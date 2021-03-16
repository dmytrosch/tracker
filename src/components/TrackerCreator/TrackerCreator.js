import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircleButton from "../../common/Button/CircleButton";
import { createTracker } from "../../redux/tracker/tracker.actions";
import styles from "./TrackerCreator.module.css";

export default function TrackerCreator() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const creatingTrackerHandler = (event) => {
        event.preventDefault();
        dispatch(createTracker(name));
        setName("");
    };
    return (
        <form onSubmit={creatingTrackerHandler} className={styles.container}>
            <input
                type="text"
                onChange={(event) => setName(event.target.value)}
                className={styles.input}
                placeholder="Enter tracker name..."
            />
            <CircleButton name="createTrackerButton" type="submit" />
        </form>
    );
}
