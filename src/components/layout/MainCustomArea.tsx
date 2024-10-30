import { FC } from 'react';

import { RNChildren } from '@/types';

import styles from '../../styles/area/mainCustomArea.module.css';

const MainCustomArea: FC<RNChildren> = ({ children }) => {
  return (
    <div className={styles.area}>
      <header className={styles.header}></header>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default MainCustomArea;
