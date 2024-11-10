'use client';

import { useContext, useState } from 'react';

import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';
import { Posts } from '@/types';
import { Timestamp } from 'firebase/firestore';

import style from '@/styles/modal/postModal.module.css';

const PostModal = () => {
  const { setIsPostModal, isPostModal } = useContext(PostContext);
  const { userProfile } = useContext(AuthContext);
  const [text, setText] = useState<string>('');
  const [postData, setPostData] = useState<Posts>({
    text: text,
    createdAt: Timestamp.now(),
    id: '',
    userId: userProfile.uid,
  });

  return (
    <div
      onClick={() => setIsPostModal(false)}
      style={{ display: isPostModal ? 'block' : 'none' }}
      className={style.background}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: COLORS.BLACK }}
        className={style.modal}
      >
        <header>
          <button
            onClick={() => setIsPostModal(false)}
            style={{ color: COLORS.WHITE }}
            className={style.closeButton}
          >
            ✗
          </button>
        </header>
        <div>
          <textarea
            placeholder={'記事を投稿'}
            className={style.textarea}
            style={{ color: COLORS.WHITE, backgroundColor: COLORS.BLACK }}
            onChange={(e) => {
              const target = e.target;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
              setText(e.target.value);
            }}
          />
        </div>
        <footer className={style.footer}>
          <div className={style.footerArea}>
            <span style={{ color: COLORS.WHITE }} className={style.countText}>
              {text.length}/3000
            </span>
            <button
              style={{
                color: COLORS.WHITE,
              }}
              className={style.postButton}
            >
              投稿する
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PostModal;
