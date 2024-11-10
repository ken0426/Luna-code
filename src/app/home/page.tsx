'use client';

import { useEffect, useState } from 'react';

import { db } from '@/firebase';
import { Posts } from '@/types';
import { dateFormat } from '@/utils';
import dayjs from 'dayjs';
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import TextCenter from '@/components/atoms/TextCenter';
import MainCustomArea from '@/components/layout/MainCustomArea';
import Card from '@/components/molecules/Card';

const Page = () => {
  const [posts, setPost] = useState<Posts[]>([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt'), limit(50));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postPromises = snapshot.docs.map(async (d) => {
        const data = d.data();
        const userRef = doc(db, 'users', data.userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().userName) {
          return null;
        }

        return {
          text: data.text,
          createdAt: data.createdAt,
          id: d.id,
          userId: data.userId,
          userName: userSnap.data().userName,
        };
      });

      const posts = (await Promise.all(postPromises)).filter(
        (post) => post !== null,
      );
      setPost(posts);
    });

    return () => unsubscribe();
  }, []);

  const sortPost = posts.sort(
    (a, b) =>
      dayjs(b.createdAt.toDate()).unix() - dayjs(a.createdAt.toDate()).unix(),
  );

  return (
    <MainCustomArea>
      {sortPost.length ? (
        sortPost.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            text={post.text}
            userName={post.userName}
            date={dateFormat(post.createdAt.toDate())}
          />
        ))
      ) : (
        <TextCenter />
      )}
    </MainCustomArea>
  );
};

export default Page;
