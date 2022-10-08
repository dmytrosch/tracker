import React, { useEffect } from "react";
import TrackerCreator from "./TrackerCreator/TrackerCreator";
import TrackerList from "./Trackers/TrackersList/TrackersList";
import Layout from "./Layout/Layout";
import { useDispatch } from "react-redux";
import { setTrackers } from "../redux/tracker/tracker.actions";
import showNotification from "../utils/showNotification";

const ipcHelpers = window.electronService;

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ipcHelpers) {
            return;
        }

        ipcHelpers.addOnLoadListener((_, { trackers }) => {
            dispatch(setTrackers(trackers));
        });

        ipcHelpers.addNotificationsListener((_, { text }) =>
            showNotification(text)
        );

        return ipcHelpers.removeGlobalListeners;
    }, []);

    return (
        <Layout>
            <TrackerCreator />
            <TrackerList />
        </Layout>
    );
}
