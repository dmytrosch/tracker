import React from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";
import Layout from './Layout/Layout';

export default function App() {
    return (
        <Layout>
            <header>
                <h1 style={{ margin: "0 auto" }}>tracker</h1>
            </header>
            <main>
                <TrackerCreator />
                <TrackerList />
            </main>
        </Layout>
    );
}
