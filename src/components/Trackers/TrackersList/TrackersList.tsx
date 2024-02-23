import React, { useEffect } from 'react';
import { useStores } from '../../StoreContext';
import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TrackerItem from '../TrackerItem/TrackerItem';
import styles from './TrackerList.module.css';
import './animation.css';


const ipcHelpers = window.electronService;

const TrackerList: React.FC = () => {
  const {
    trackers: { trackers: trackersList },
  } = useStores();
  const isStateConfigured = true;

  useEffect(() => {
    if (!ipcHelpers || !isStateConfigured) {
      return;
    }

    ipcHelpers.sendUpdateTrackersListEvent(trackersList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackersList]);

  return (
    <>
      {trackersList.length ? (
        <TransitionGroup component="ul" className={styles.container}>
          {trackersList.map((item, index) => (
            <CSSTransition key={item.id} timeout={250} classNames="tracker">
              <TrackerItem id={item.id} order={index + 1} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>There is not added trackers</p>
      )}
    </>
  );
};

export default observer(TrackerList)
