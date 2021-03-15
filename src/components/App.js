import React from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";

export default function App() {
    return (
        <>
            <header>
                <h1 style={{ margin: "0 auto" }}>tracker</h1>
            </header>
            <main>
                <TrackerCreator />
                <TrackerList />
            </main>
        </>
    );
}
