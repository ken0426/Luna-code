'use client';

import { useContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { db } from '@/firebase';
import { AuthContext } from '@/provider/AuthProvider';
import { COLORS } from '@/styles';
import { Posts } from '@/types';
import { doc, getDoc } from 'firebase/firestore';

import MainCustomArea from '@/components/layout/MainCustomArea';

import style from '@/styles/status/status.module.css';

const Page = () => {
  const router = useRouter();
  const { userProfile } = useContext(AuthContext);
  const [postDat, setPostData] = useState<null | Posts>(null);
  const pathname = usePathname();
  const statusString = pathname.split('/status/')[1];

  useEffect(() => {
    const fetchPostData = async () => {
      if (statusString) {
        const docRef = doc(db, 'posts', statusString);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPostData(docSnap.data() as Posts);
        } else {
          router.push('/error');
        }
      }
    };

    fetchPostData(); // 非同期関数を呼び出す
  }, [statusString]);

  console.log(postDat);

  return userProfile && postDat ? (
    <MainCustomArea>
      <div className={style.container}>
        <header style={{ color: COLORS.WHITE }} className={style.header}>
          <button className={style.headerButton}>
            <span onClick={() => router.back()} className={style.backArrow}>
              ←
            </span>
            　戻る
          </button>

          {userProfile.uid === postDat.userId ? (
            <button>削除する</button>
          ) : null}
        </header>
        <div className={style.card}>
          <p style={{ color: COLORS.WHITE }} className={style.userName}>
            {userProfile.userName}
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.postText}>
            {postDat.text}
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.date}>
            投稿日：{postDat.createdAt.toDate().toLocaleDateString()}
          </p>
        </div>
      </div>
    </MainCustomArea>
  ) : null;
};

export default Page;
