import { FC, Fragment } from 'react';

import { useRouter } from 'next/navigation';

import { COLORS } from '@/styles';

import style from '@/styles/card/card.module.css';

type Props = {
  id: string;
  text: string;
  date: string;
  userName: string;
};

const Card: FC<Props> = ({ id, text, date, userName }) => {
  const router = useRouter();

  return (
    <div
      key={id}
      className={style.card}
      onClick={() => router.push(`status/${id}`)}
    >
      <div className={style.flex}>
        <p style={{ color: COLORS.WHITE }} className={style.userName}>
          {userName}
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
  );
};

export default Card;
