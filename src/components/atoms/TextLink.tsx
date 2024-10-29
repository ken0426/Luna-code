import { FC, MouseEvent } from 'react';

import { COLORS } from '@/styles';

import style from '../../styles/button/textLink.module.css';

type Props = {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const TextLink: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={style.button}
      style={{ color: COLORS.WHITE }}
    >
      {text}
    </button>
  );
};

export default TextLink;
