import { FC } from 'react';

import { COLORS } from '@/styles';

import style from '@/styles/error/error.module.css';

type Props = {
  message: string;
};

const ErrorArea: FC<Props> = ({ message }) => {
  return (
    <div className={style.container} style={{ color: COLORS.WHITE }}>
      <p style={{ color: COLORS.WHITE }} className={style.text}>
        {message}
      </p>
    </div>
  );
};

export default ErrorArea;
