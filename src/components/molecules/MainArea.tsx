import { CSSProperties, FC } from 'react';

import { COLORS } from '@/styles';
import { RNChildren } from '@/types';

import styles from '../../styles/area/mainArea.module.css';

const MainArea: FC<RNChildren> = ({ children }) => {
  return (
    <div
      className={styles.contents}
      style={{ '--background-color': COLORS.GRAY } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default MainArea;
