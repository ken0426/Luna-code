'use client';

import { useEffect, useState } from 'react';

import { db } from '@/firebase';
import { dateFormat } from '@/utils';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import MainCustomArea from '@/components/layout/MainCustomArea';
import Card from '@/components/molecules/Card';

type Posts = {
  text: string;
  createdAt: any;
  id: string;
};

const Page = () => {
  const [posts, setPost] = useState<Posts[]>([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt'), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPost(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            text: data.text,
            createdAt: data.createdAt,
            id: doc.id,
          };
        }),
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <MainCustomArea>
      {posts.map((post) => (
        <Card
          key={post.id}
          id={post.id}
          text={post.text}
          date={dateFormat(post.createdAt.toDate())}
        />
      ))}
    </MainCustomArea>
  );
};

export default Page;
