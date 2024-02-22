import React, { useEffect } from 'react';
import TrackerCreator from './TrackerCreator/TrackerCreator';
import TrackerList from './Trackers/TrackersList/TrackersList';
import Layout from './Layout/Layout';
import { setTrackers } from '../redux/tracker/tracker.actions';
import { useAppDispatch } from '../hooks/redux-hooks';
import showNotification from '../utils/showNotification';

const ipcHelpers = window.electronService;

const App: React.FC = () => {
  const dispatch = useAppDispatch();

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

    ipcHelpers.addOnResetDataListener(() => dispatch(setTrackers([])));

    return ipcHelpers.removeGlobalListeners;
  }, []);
  return (
    <Layout>
      <TrackerCreator />
      <TrackerList />
    </Layout>
  );
};

export default App;
