import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import TrackerCreator from './TrackerCreator/TrackerCreator';
import TrackerList from './Trackers/TrackersList/TrackersList';
import Layout from './Layout/Layout';
import showNotification from '../utils/showNotification';
import { useStores } from './StoreContext';

const ipcHelpers = window.electronService;

const App: React.FC = () => {
  const { trackers: trackersStore } = useStores();

  useEffect(() => {
    if (!ipcHelpers) {
      return;
    }

    ipcHelpers.addOnLoadListener((_, { trackers }) => {
      trackersStore.setTrackers(trackers);
    });

    ipcHelpers.addNotificationsListener((_, { text }) =>
      showNotification(text)
    );

    ipcHelpers.addOnResetDataListener(trackersStore.clearTrackers);

    return ipcHelpers.removeGlobalListeners;
  }, []);
  return (
    <Layout>
      <TrackerCreator />
      <TrackerList />
    </Layout>
  );
};

export default observer(App);
