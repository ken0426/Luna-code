import { FC } from 'react';

import { COLORS } from '@/styles';

import style from '../../styles/text/error.module.css';

type Props = {
  message: string | undefined;
};

const ErrorText: FC<Props> = ({ message }) => {
  return message ? (
    <p style={{ color: COLORS.ERROR }} className={style.error}>
      {message}
    </p>
  ) : null;
};

export default ErrorText;
