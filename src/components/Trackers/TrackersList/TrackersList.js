import React from "react";
import TrackerItem from "../TrackerItem/TrackerItem";

const arr = [
    { name: "first tracker", time: "12:58:45" },
    { name: "first tracker", time: "12:58:45" },
    { name: "first tracker", time: "12:58:45" },
];

export default function TrackerList() {
    return (
        <ul>
            {arr.map((item, ind) => (
                <TrackerItem key={ind} name={item.name} time={item.time} />
            ))}
        </ul>
    );
}
