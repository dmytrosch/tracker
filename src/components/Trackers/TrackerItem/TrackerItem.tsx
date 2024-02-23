import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Duration } from 'moment';
import { computed } from 'mobx';
import classNames from 'classnames';
import formatDate from '../../../utils/formatDate';
import getTimeDistance from '../../../utils/getTimeDistance';
import styles from './TrackerItem.module.css';
import CircleButton from '../../../common/Button/CircleButton';
import { TrackerObjectType } from '../../../types/types';
import showNotification from '../../../utils/showNotification';
import { useStores } from '../../StoreContext';

interface IProps {
  id: TrackerObjectType['id'];
  order: number;
}

const TrackerItem: React.FC<IProps> = ({ id, order }) => {
  const [timeDistance, setTimeDistance] = useState<Duration | null>(null);
  const [timeDistanceNumbered, setTimeDistanceNumbered] = useState<
    string | null
  >();
  const timerRef = useRef<number | null>(null);

  const { trackers, ui } = useStores();
  const trackerObj = computed(() => trackers.findTrackerById(id)).get();

  const { name, isActive, stoppedOnParsed } = trackerObj || {};
  const isDark = ui.isDark;

  const trackerActivityToggler = (): void => {
    if (isActive && timeDistance && timeDistanceNumbered) {
      trackers.stopTracker({
        id,
        timeDistance: timeDistance.toString(),
        timeDistanceNumbered,
      });

      showNotification(`A tracker "${name}" stopped!`);
    } else {
      trackers.resumeTracker(id);
      showNotification(`A tracker "${name}" resumed!`);
    }
  };
  const deleteTrackerHandler = (): void => {
    trackers.removeTracker(id);
    showNotification(`A tracker "${name}" removed!`);
  };

  const clearRefInterval = (): void => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
  };

  const buttonName = isActive
    ? isDark
      ? 'pauseButtonLight'
      : 'pauseButtonDark'
    : isDark
      ? 'resumeButtonLight'
      : 'resumeButtonDark';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!trackerObj) {
      return () => {};
    }

    if (!isActive) {
      timeDistanceNumbered
        ? clearRefInterval()
        : setTimeDistanceNumbered(stoppedOnParsed);

      return clearRefInterval;
    }
    timerRef.current = window.setInterval(() => {
      const distance = getTimeDistance(trackerObj);
      setTimeDistance(distance);
      setTimeDistanceNumbered(formatDate(distance));
    }, 1000);

    return clearRefInterval;
  }, [isActive]);

  return (
    <li className={classNames([styles.container, isActive && styles.active])}>
      <div className={styles.trackerName}>
        #{order}.&ensp;{name}
      </div>
      <div className={styles.rightContainer}>
        <span>
          {timeDistanceNumbered ? timeDistanceNumbered : 'Loading...'}
        </span>
        <CircleButton
          name={buttonName}
          onClick={trackerActivityToggler}
          isDark={isDark}
        />
        <CircleButton
          name="deleteButton"
          onClick={deleteTrackerHandler}
          isDark={isDark}
        />
      </div>
    </li>
  );
};

export default observer(TrackerItem);
