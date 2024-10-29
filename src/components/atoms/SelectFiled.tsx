import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { COLORS } from '@/styles';

import style from '../../styles/select/select.module.css';

type Props = {
  register: UseFormRegisterReturn;
};

const SelectFiled: FC<Props> = ({ register }) => {
  return (
    <>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        性別
      </label>
      <select id="sex-select" className={style.selectForm} {...register}>
        <option value="">選択してください</option>
        <option value="man">男性</option>
        <option value="woman">女性</option>
      </select>
    </>
  );
};

export default SelectFiled;
