import { CSSProperties } from 'react';

import { COLORS } from '@/styles';

import styles from '../styles/login/login.module.css';

export default function Home() {
  return (
    <div
      className={styles.contents}
      style={{ '--background-color': COLORS.GRAY } as CSSProperties}
    ></div>
  );
}
