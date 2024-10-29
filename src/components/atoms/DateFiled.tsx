import { COLORS } from '@/styles';

import style from '../../styles/date/date.module.css';

const DateFiled = () => {
  return (
    <>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        生年月日
      </label>
      <input type="date" min={'1900-01-01'} className={style.date} />
    </>
  );
};

export default DateFiled;
