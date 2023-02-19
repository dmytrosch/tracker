import React from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";
import Layout from "./Layout/Layout";

const App: React.FC = () => {
    return (
        <Layout>
            <TrackerCreator />
            <TrackerList />
        </Layout>
    );
}

export default App
