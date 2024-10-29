import React, { FC } from 'react';

import { COLORS } from '@/styles';

import globalStyles from '../../styles/global.module.css';
import tagStyles from '../../styles/tag/tag.module.css';

type Props = {
  tag?: React.ElementType;
  children: string;
  className?: string;
  size?: 30;
};

const Tag: FC<Props> = ({ tag = 'h1', children, className, size }) => {
  const fontSize = () => {
    switch (size) {
      case 30:
        return globalStyles.fontSize30;
    }
  };
  const classNames = `${className} ${tagStyles.text} ${fontSize()}`;
  const Tag = tag;
  return (
    <Tag className={classNames} style={styles.text}>
      {children}
    </Tag>
  );
};

export default Tag;

const styles = {
  text: {
    color: COLORS.WHITE,
  },
};
