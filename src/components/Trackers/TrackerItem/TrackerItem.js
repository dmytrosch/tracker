import React from "react";

export default function TrackerItem({ name, time }) {
    return (
        <li>
            <span>{name}</span>
            <span>{time}</span>
            <button>Stop</button>
            <button>Del</button>
        </li>
    );
}
