import React from 'react';
import styles from './ThemeSwitcher.module.css';

interface IProps {
  isDark: boolean;
  onChange: React.ChangeEventHandler;
  invertedIconLogic?: boolean;
}
const defaultOptions = {
  invertedIconLogic: false,
};

const ThemeSwitcher: React.FC<IProps> = ({
  isDark,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <div className={styles.switcherWrapper}>
    <label
      className={styles.switcher}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        type="checkbox"
        defaultChecked={invertedIconLogic ? !isDark : isDark}
        onChange={onChange}
      />
      <div />
    </label>
  </div>
);

export default ThemeSwitcher;