import { COLORS } from '@/styles';

import style from '../../styles/select/select.module.css';

const SelectFiled = () => {
  return (
    <>
      <label className={style.label} style={{ color: COLORS.WHITE }}>
        性別
      </label>
      <select name="sex" id="sex-select" className={style.selectForm}>
        <option value="">選択してください</option>
        <option value="man">男性</option>
        <option value="woman">女性</option>
      </select>
    </>
  );
};

export default SelectFiled;
