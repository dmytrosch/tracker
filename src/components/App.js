import React from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";
import Layout from "./Layout/Layout";

export default function App() {
    return (
        <Layout>
            <TrackerCreator />
            <TrackerList />
        </Layout>
    );
}
