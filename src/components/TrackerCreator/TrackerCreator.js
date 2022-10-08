import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircleButton from "../../common/Button/CircleButton";
import { createTracker } from "../../redux/tracker/tracker.actions";
import showNotification from "../../utils/showNotification";
import styles from "./TrackerCreator.module.css";

export default function TrackerCreator() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const creatingTrackerHandler = (event) => {
        event.preventDefault();
        dispatch(createTracker(name));
        showNotification(`A new tracker ${name || ''} was created`)

        setName("");
    };
    return (
        <form onSubmit={creatingTrackerHandler} className={styles.container}>
            <input
                type="text"
                onChange={(event) => setName(event.target.value)}
                value={name}
                className={styles.input}
                placeholder="Enter tracker name..."
            />
            <CircleButton name="createTrackerButton" type="submit" />
        </form>
    );
}
