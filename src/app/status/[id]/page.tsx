'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { AuthContext } from '@/provider/AuthProvider';
import { COLORS } from '@/styles';

import Loading from '@/components/atoms/Loading';
import MainCustomArea from '@/components/layout/MainCustomArea';

import style from '@/styles/status/status.module.css';

const page = () => {
  const router = useRouter();
  const { userProfile } = useContext(AuthContext);
  return userProfile ? (
    <MainCustomArea>
      <div className={style.container}>
        <header style={{ color: COLORS.WHITE }} className={style.header}>
          <button className={style.headerButton}>
            <span onClick={() => router.back()} className={style.backArrow}>
              ←
            </span>
            　戻る
          </button>

          <button>削除する</button>
        </header>
        <div className={style.card}>
          <p style={{ color: COLORS.WHITE }} className={style.userName}>
            {userProfile.userName}
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.postText}>
            テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.date}>
            投稿日：YYYY-MM-DD
          </p>
        </div>
      </div>
    </MainCustomArea>
  ) : (
    <Loading />
  );
};

export default page;
