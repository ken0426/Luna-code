import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { COLORS } from '@/styles';

import style from '../../styles/date/date.module.css';

type Props = {
  register: UseFormRegisterReturn;
};

const DateFiled: FC<Props> = ({ register }) => {
  return (
    <>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        生年月日
      </label>
      <input
        type="date"
        min={'1900-01-01'}
        className={style.date}
        {...register}
      />
    </>
  );
};

export default DateFiled;
