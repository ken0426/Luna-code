'use client';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createPostApi } from '@/api/post';
import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { PostSchemaType, postSchema } from '@/schema/post';
import { COLORS } from '@/styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import style from '@/styles/modal/postModal.module.css';

const PostModal = () => {
  const { setIsPostModal, isPostModal } = useContext(PostContext);
  const { userProfile } = useContext(AuthContext);
  const userId = userProfile.uid;

  const [text, setText] = useState<string>('');

  const { handleSubmit, register, setValue, reset } = useForm<PostSchemaType>({
    defaultValues: {
      text: '',
      createdAt: Timestamp.now(),
      id: uuid(),
      userId: '',
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostSchemaType) => {
    await createPostApi(data);
    setIsPostModal(false);
    reset();
  };

  const onClose = () => {
    reset();
    setText('');
    setIsPostModal(false);
  };

  return (
    <div
      onClick={onClose}
      style={{ display: isPostModal ? 'block' : 'none' }}
      className={style.background}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: COLORS.BLACK }}
        className={style.modal}
        onSubmit={(e) => {
          setValue('userId', userId);
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <header>
          <button
            onClick={onClose}
            style={{ color: COLORS.WHITE }}
            className={style.closeButton}
          >
            ✗
          </button>
        </header>
        <div>
          <textarea
            {...register('text')}
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
            <span
              style={{
                color: text.length > 140 ? COLORS.ERROR : COLORS.WHITE,
              }}
              className={style.countText}
            >
              {text.length}/140
            </span>
            <button
              type="submit"
              style={{
                color:
                  text.length > 0 && text.length <= 140
                    ? COLORS.WHITE
                    : COLORS.GRAY,
              }}
              className={
                text.length > 0 && text.length <= 140
                  ? style.postButton
                  : style.disabledButton
              }
            >
              投稿する
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default PostModal;
