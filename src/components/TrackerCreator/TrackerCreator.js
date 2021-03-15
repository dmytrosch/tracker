import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTracker } from "../../redux/tracker/tracker.actions";

export default function TrackerCreator() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const creatingTrackerHandler = (event) => {
        event.preventDefault()
        dispatch(createTracker(name));
    };
    return (
        <form onSubmit={creatingTrackerHandler}>
            <input
                type="text"
                onChange={(event) => setName(event.target.value)}
            />
            <button type="submit">Start</button>
        </form>
    );
}
