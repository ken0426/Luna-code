import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { COLORS } from '@/styles';
import { RNChildren } from '@/types';

import styles from '../../styles/area/mainCustomArea.module.css';

const MainCustomArea: FC<RNChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <div className={styles.area}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li
              onClick={() => router.push('/home')}
              style={{ color: COLORS.WHITE }}
              className={styles.navItem}
            >
              ホーム
            </li>
            <li style={{ color: COLORS.WHITE }} className={styles.navItem}>
              投稿する
            </li>
            <li
              onClick={() => router.push('/settings')}
              style={{ color: COLORS.WHITE }}
              className={styles.navItem}
            >
              設定
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default MainCustomArea;
