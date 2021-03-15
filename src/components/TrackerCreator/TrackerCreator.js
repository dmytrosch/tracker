import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function TrackerCreator() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const creatingTrackerHandler = (event) => {};
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
