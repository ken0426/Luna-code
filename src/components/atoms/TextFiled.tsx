import { FC, HTMLInputTypeAttribute } from 'react';

import { COLORS } from '@/styles';

import style from '../../styles/textFiled/textFiled.module.css';

type Props = {
  labelName: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

const TextFiled: FC<Props> = ({ labelName, placeholder, type }) => {
  return (
    <div className={style.inputArea}>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        {labelName}
      </label>
      <input type={type} className={style.input} placeholder={placeholder} />
    </div>
  );
};

export default TextFiled;
