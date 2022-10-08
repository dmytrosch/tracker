import React, { useEffect } from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";
import Layout from "./Layout/Layout";
import { useDispatch } from "react-redux";
import { setTrackers } from "../redux/tracker/tracker.actions";

const ipcHelpers = window.electronServices;

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ipcHelpers) {
            return;
        }

        ipcHelpers.addOnLoadListener((_, { trackers }) => {
            if (trackers.length === 0) {
                return;
            }
            dispatch(setTrackers(trackers));
        });

        return ipcHelpers.removeOnLoadListener
    }, []);

    return (
        <Layout>
            <TrackerCreator />
            <TrackerList />
        </Layout>
    );
}
