import React, { useState } from "react";
import CircleButton from "../../common/Button/CircleButton";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { createTracker } from "../../redux/tracker/tracker.actions";
import styles from "./TrackerCreator.module.css";

type NameState = [string, (x: string) => void]

const TrackerCreator: React.FC = () => {
    const [name, setName]: NameState = useState("");
    const dispatch = useAppDispatch();

    const creatingTrackerHandler: React.FormEventHandler = (event) => {
        event.preventDefault();
        dispatch(createTracker(name));
        setName("");
    };
    return (
        <form onSubmit={creatingTrackerHandler} className={styles.container}>
            <input
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                value={name}
                className={styles.input}
                placeholder="Enter tracker name..."
            />
            <CircleButton name="createTrackerButton" type="submit" />
        </form>
    );
}

export default TrackerCreator