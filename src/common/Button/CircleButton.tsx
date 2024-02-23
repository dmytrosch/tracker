import React from 'react';
import styles from './CircleButton.module.css';

interface IProps {
  name: keyof typeof styles;
  isDark: boolean;
}

const CircleButton: React.FC<
  IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ name, isDark, ...props }) => {
  const buttonClassName = `${styles[name]} ${styles[isDark ? 'buttonDark' : 'buttonLight']}`;
  return <button className={buttonClassName} {...props} />;
};

export default CircleButton;
