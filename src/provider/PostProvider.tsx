'use client';

import { FC, ReactNode, createContext, useState } from 'react';

import DeletePostModal from '@/components/molecules/DeletePostModal';
import ErrorModal from '@/components/molecules/ErrorModal';
import LogoutModal from '@/components/molecules/LogoutModal';
import PostModal from '@/components/molecules/PostModal';

type Props = {
  children: ReactNode;
};

type PostState = {
  isPostModal: boolean;
  setIsPostModal: (isPostModal: boolean) => void;
  isPostDeleteModal: boolean;
  setIsPostDeleteModal: (isPostDeleteModal: boolean) => void;
  isLogoutModal: boolean;
  setIsLogoutModal: (isLogoutModal: boolean) => void;
  postErrorModal: null | string;
  setPostErrorModal: (postErrorModal: null | string) => void;
};

const defaultValue = {
  isPostModal: false,
  setIsPostModal: () => {},
  isPostDeleteModal: false,
  setIsPostDeleteModal: () => {},
  isLogoutModal: false,
  setIsLogoutModal: () => {},
  postErrorModal: null,
  setPostErrorModal: () => {},
};

export const PostContext = createContext<PostState>(defaultValue);

const PostProvider: FC<Props> = ({ children }) => {
  const [isPostModal, setIsPostModal] = useState(false);
  const [isPostDeleteModal, setIsPostDeleteModal] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [postErrorModal, setPostErrorModal] = useState<null | string>(null);

  return (
    <PostContext.Provider
      value={{
        isPostModal,
        setIsPostModal,
        isPostDeleteModal,
        setIsPostDeleteModal,
        isLogoutModal,
        setIsLogoutModal,
        postErrorModal,
        setPostErrorModal,
      }}
    >
      {children}
      <PostModal />
      <DeletePostModal />
      <LogoutModal />
      <ErrorModal />
    </PostContext.Provider>
  );
};

export default PostProvider;
