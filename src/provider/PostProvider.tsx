'use client';

import { FC, ReactNode, createContext, useState } from 'react';

import DeletePostModal from '@/components/molecules/DeletePostModal';
import PostModal from '@/components/molecules/PostModal';

type Props = {
  children: ReactNode;
};

type PostState = {
  isPostModal: boolean;
  setIsPostModal: (isPostModal: boolean) => void;
  isPostDeleteModal: boolean;
  setIsPostDeleteModal: (isPostDeleteModal: boolean) => void;
};

const defaultValue = {
  isPostModal: false,
  setIsPostModal: () => {},
  isPostDeleteModal: false,
  setIsPostDeleteModal: () => {},
};

export const PostContext = createContext<PostState>(defaultValue);

const PostProvider: FC<Props> = ({ children }) => {
  const [isPostModal, setIsPostModal] = useState(false);
  const [isPostDeleteModal, setIsPostDeleteModal] = useState(false);

  return (
    <PostContext.Provider
      value={{
        isPostModal,
        setIsPostModal,
        isPostDeleteModal,
        setIsPostDeleteModal,
      }}
    >
      {children}
      <PostModal />
      <DeletePostModal />
    </PostContext.Provider>
  );
};

export default PostProvider;
