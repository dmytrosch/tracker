import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStores } from '../StoreContext';
import CircleButton from '../../common/Button/CircleButton';
import showNotification from '../../utils/showNotification';
import styles from './TrackerCreator.module.css';


type NameState = [string, (x: string) => void];

const TrackerCreator: React.FC = () => {
  const [name, setName]: NameState = useState('');
  const { trackers } = useStores();
  

  const creatingTrackerHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    trackers.createTracker(name);
    showNotification(`A new tracker ${name || ''} was created`);

    setName('');
  };
  return (
    <form onSubmit={creatingTrackerHandler} className={styles.container}>
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        value={name}
        className={styles.input}
        placeholder="Enter tracker name..."
      />
      <CircleButton name="createTrackerButton" type="submit" />
    </form>
  );
};

export default observer(TrackerCreator);
