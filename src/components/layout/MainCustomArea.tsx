import { FC, useContext } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';
import { RNChildren } from '@/types';

import styles from '../../styles/area/mainCustomArea.module.css';

const MainCustomArea: FC<RNChildren> = ({ children }) => {
  const router = useRouter();
  const { setIsPostModal } = useContext(PostContext);

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
            <Image
              onClick={() => router.push('/home')}
              src={'/home.png'}
              alt={'home-log'}
              width={30}
              height={30}
              className={styles.tabletIcon}
            />
            <li
              onClick={() => setIsPostModal(true)}
              style={{ color: COLORS.WHITE }}
              className={styles.navItem}
            >
              投稿する
            </li>
            <Image
              onClick={() => setIsPostModal(true)}
              src={'/pen.png'}
              alt={'post-log'}
              width={30}
              height={30}
              className={styles.tabletIcon}
            />
            <li
              onClick={() => router.push('/settings')}
              style={{ color: COLORS.WHITE }}
              className={styles.navItem}
            >
              設定
            </li>
            <Image
              onClick={() => router.push('/settings')}
              src={'/setting.png'}
              alt={'setting-log'}
              width={30}
              height={30}
              className={styles.tabletIcon}
            />
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <ul className={styles.footerBottom}>
          <li>
            <Image
              onClick={() => router.push('/settings')}
              src={'/setting.png'}
              alt={'setting-log'}
              width={30}
              height={30}
            />
          </li>
          <li>
            <Image
              onClick={() => router.push('/home')}
              src={'/home.png'}
              alt={'home-log'}
              width={30}
              height={30}
            />
          </li>

          <li>
            <Image
              onClick={() => setIsPostModal(true)}
              src={'/pen.png'}
              alt={'post-log'}
              width={30}
              height={30}
            />
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default MainCustomArea;
