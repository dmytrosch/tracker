import React from 'react';
import styles from './Layout.module.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { observer } from 'mobx-react-lite';
import { useStores } from '../StoreContext';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const { ui } = useStores();
  const isDark = ui.isDark;

  const wrapperClassName = isDark ? styles.wrapperDark : styles.wrapperLight;
  const titleClassName = isDark ? styles.titleDark : styles.titleLight;

  return (
    <div className={wrapperClassName}>
      <div className={styles.container}>
        <header className={styles.header}>
          <ThemeSwitcher isDark={isDark} onChange={ui.toggleTheme.bind(ui)} />
          <h1 className={titleClassName}>tracker</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default observer(Layout);
