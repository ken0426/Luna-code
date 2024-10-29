import { FC } from 'react';

import { COLORS } from '@/styles';

import style from '../../styles/button/defaultButton.module.css';

type Props = {
  text: string;
  buttonColor?: COLORS;
  textColor?: COLORS;
  disabled?: boolean;
};

const DefaultButton: FC<Props> = ({
  text,
  buttonColor = COLORS.BLUE,
  textColor = COLORS.WHITE,
  disabled = false,
}) => {
  return (
    <button
      className={disabled ? style.disabledButton : style.button}
      style={{ backgroundColor: buttonColor, color: textColor }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
