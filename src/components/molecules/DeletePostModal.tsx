'use client';

import { useContext } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { deletePostApi } from '@/api/post';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';

import style from '@/styles/modal/deletePostModal.module.css';

const DeletePostModal = () => {
  const pathname = usePathname();
  const router = useRouter();
  const statusString = pathname.split('/status/')[1];
  const { isPostDeleteModal, setIsPostDeleteModal, setPostErrorModal } =
    useContext(PostContext);

  return (
    <div
      onClick={() => setIsPostDeleteModal(false)}
      style={{ display: isPostDeleteModal ? 'block' : 'none' }}
      className={style.background}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: COLORS.BLACK }}
        className={style.modal}
        onSubmit={async (e) => {
          e.preventDefault();
          const error = await deletePostApi(statusString);
          if (error) {
            setPostErrorModal(error);
          } else {
            setIsPostDeleteModal(false);
            router.push('/home');
          }
        }}
      >
        <p style={{ color: COLORS.WHITE }} className={style.text}>
          投稿を削除しますか？
        </p>
        <p style={{ color: COLORS.INVALID_TEXT }} className={style.subText}>
          この操作は取り消すことができません。タイムライン上からも削除されます。
        </p>
        <button
          className={style.button}
          style={{ backgroundColor: COLORS.ERROR, color: COLORS.WHITE }}
        >
          削除
        </button>
      </form>
    </div>
  );
};

export default DeletePostModal;
