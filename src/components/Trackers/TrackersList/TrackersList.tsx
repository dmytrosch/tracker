import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TrackerItem from '../TrackerItem/TrackerItem';
import {
  getAllTrackersSelector,
  getIsStateConfigured,
} from '../../../redux/tracker/tracker.selectors';
import styles from './TrackerList.module.css';
import { TrackerListType } from '../../../types/types';
import { useAppSelector } from '../../../hooks/redux-hooks';

import './animation.css';

const ipcHelpers = window.electronService;

const TrackerList: React.FC = () => {
  const trackersList: TrackerListType = useAppSelector(getAllTrackersSelector);
  const isStateConfigured = useAppSelector(getIsStateConfigured);

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

export default TrackerList;
