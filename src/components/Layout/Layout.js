import React from "react";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>tracker</h1>
            </header>
            <main>{children}</main>
        </div>
    );
}
