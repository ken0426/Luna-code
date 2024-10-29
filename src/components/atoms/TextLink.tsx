import { FC } from 'react';

import { COLORS } from '@/styles';

import style from '../../styles/button/textLink.module.css';

type Props = {
  text: string;
  onClick: () => void;
};

const TextLink: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={style.button}
      style={{ color: COLORS.WHITE }}
    >
      {text}
    </button>
  );
};

export default TextLink;
