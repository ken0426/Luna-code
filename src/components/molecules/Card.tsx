import { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { AuthContext } from '@/provider/AuthProvider';
import { COLORS } from '@/styles';

import Loading from '@/components/atoms/Loading';

import style from '@/styles/card/card.module.css';

const Card = () => {
  const { userProfile } = useContext(AuthContext);
  const router = useRouter();
  const id = 1;
  return userProfile ? (
    <div className={style.card} onClick={() => router.push(`status/${id}`)}>
      <div className={style.flex}>
        <p style={{ color: COLORS.WHITE }} className={style.userName}>
          {userProfile?.userName}
        </p>
        <p style={{ color: COLORS.WHITE }} className={style.date}>
          投稿日：YYYY-MM-DD
        </p>
      </div>
      <p style={{ color: COLORS.WHITE }} className={style.post}>
        テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります
      </p>
    </div>
  ) : (
    <Loading />
  );
};

export default Card;
