import { FC, Fragment, useContext } from 'react';

import { useRouter } from 'next/navigation';

import { AuthContext } from '@/provider/AuthProvider';
import { COLORS } from '@/styles';

import Loading from '@/components/atoms/Loading';

import style from '@/styles/card/card.module.css';

type Props = {
  id: string;
  text: string;
  date: string;
};

const Card: FC<Props> = ({ id, text, date }) => {
  const { userProfile } = useContext(AuthContext);
  const router = useRouter();

  return userProfile ? (
    <div
      key={id}
      className={style.card}
      onClick={() => router.push(`status/${id}`)}
    >
      <div className={style.flex}>
        <p style={{ color: COLORS.WHITE }} className={style.userName}>
          {userProfile?.userName}
        </p>
        <p style={{ color: COLORS.WHITE }} className={style.date}>
          {`投稿日：${date}`}
        </p>
      </div>
      <p style={{ color: COLORS.WHITE }} className={style.post}>
        {text.split('\n').map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </p>
    </div>
  ) : (
    <Loading />
  );
};

export default Card;
