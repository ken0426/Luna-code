'use client';

import { Fragment, useContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { db } from '@/firebase';
import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';
import { Posts } from '@/types';
import { dateFormat } from '@/utils';
import { doc, getDoc } from 'firebase/firestore';

import MainCustomArea from '@/components/layout/MainCustomArea';

import style from '@/styles/status/status.module.css';

const Page = () => {
  const router = useRouter();
  const { userProfile } = useContext(AuthContext);
  const { setIsPostDeleteModal } = useContext(PostContext);
  const [postDat, setPostData] = useState<null | Posts>(null);
  const [userName, setUserName] = useState('');
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

    fetchPostData();

    const getUsrName = async () => {
      if (postDat) {
        const userRef = doc(db, 'users', postDat.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().userName);
        }
      }
    };
    getUsrName();
  }, [statusString, router, postDat]);

  console.log(postDat);

  return userProfile && postDat && !!userName ? (
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
            <button onClick={() => setIsPostDeleteModal(true)}>削除する</button>
          ) : null}
        </header>
        <div className={style.card}>
          <p style={{ color: COLORS.WHITE }} className={style.userName}>
            {userName}
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.postText}>
            {postDat.text.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
          <p style={{ color: COLORS.WHITE }} className={style.date}>
            投稿日：{dateFormat(postDat.createdAt.toDate(), 'YYYY-MM-DD HH:mm')}
          </p>
        </div>
      </div>
    </MainCustomArea>
  ) : null;
};

export default Page;
