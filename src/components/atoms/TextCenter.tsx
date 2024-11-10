import { COLORS } from '@/styles';

import style from '@/styles/text/textCenter.module.css';

const TextCenter = () => {
  return (
    <div style={{ color: COLORS.WHITE }} className={style.container}>
      <p className={style.text}>投稿はありません</p>
    </div>
  );
};

export default TextCenter;
