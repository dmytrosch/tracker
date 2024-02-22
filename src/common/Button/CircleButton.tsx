import React from 'react';
import styles from './CircleButton.module.css';

interface IProps {
  name: keyof typeof styles;
}

const CircleButton: React.FC<
  IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ name, ...props }) => {
  return <button className={styles[name]} {...props} />;
};

export default CircleButton;
