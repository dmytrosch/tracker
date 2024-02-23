import React from 'react';
import { useStores } from '../../StoreContext';
import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TrackerItem from '../TrackerItem/TrackerItem';
import styles from './TrackerList.module.css';
import './animation.css';

const TrackerList: React.FC = () => {
  const {
    trackers: { trackers: trackersList },
  } = useStores();

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

export default observer(TrackerList);
