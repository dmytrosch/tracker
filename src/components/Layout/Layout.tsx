import React from "react";
import styles from "./Layout.module.css";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>tracker</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
