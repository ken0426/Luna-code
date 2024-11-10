'use client';

import { FC, ReactNode, createContext, useState } from 'react';

import PostModal from '@/components/molecules/PostModal';

type Props = {
  children: ReactNode;
};

type PostState = {
  isPostModal: boolean;
  setIsPostModal: (isPostModal: boolean) => void;
};

const defaultValue = {
  isPostModal: false,
  setIsPostModal: () => {},
};

export const PostContext = createContext<PostState>(defaultValue);

const PostProvider: FC<Props> = ({ children }) => {
  const [isPostModal, setIsPostModal] = useState(false);

  return (
    <PostContext.Provider value={{ isPostModal, setIsPostModal }}>
      {children}
      <PostModal />
    </PostContext.Provider>
  );
};

export default PostProvider;
