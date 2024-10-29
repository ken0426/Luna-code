import { FC, HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { COLORS } from '@/styles';

import style from '../../styles/textFiled/textFiled.module.css';

type Props = {
  labelName: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
};

const TextFiled: FC<Props> = ({ labelName, placeholder, type, register }) => {
  return (
    <div className={style.inputArea}>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        {labelName}
      </label>
      <input
        type={type}
        className={style.input}
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
};

export default TextFiled;
