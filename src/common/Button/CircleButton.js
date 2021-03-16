import React from "react";
import styles from "./CircleButton.module.css";

export default function CircleButton({ name, ...props }) {
    return <button className={styles[name]} {...props} />;
}
