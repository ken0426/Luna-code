'use client';

import { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { logoutUserApi } from '@/api/users';
import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';

import style from '@/styles/modal/logoutModal.module.css';

const LogoutModal = () => {
  const router = useRouter();
  const { setIsLogoutModal, isLogoutModal } = useContext(PostContext);
  const { setAuthErrorModal } = useContext(AuthContext);
  return (
    <div
      onClick={() => setIsLogoutModal(false)}
      style={{ display: isLogoutModal ? 'block' : 'none' }}
      className={style.background}
    >
      <form
        style={{ backgroundColor: COLORS.BLACK }}
        className={style.modal}
        onSubmit={async (e) => {
          e.preventDefault();
          const error = await logoutUserApi();
          if (error) {
            setAuthErrorModal(error);
          } else {
            setIsLogoutModal(false);
            router.push('/');
          }
        }}
      >
        <p style={{ color: COLORS.WHITE }} className={style.text}>
          ログアウトしますか？
        </p>
        <p style={{ color: COLORS.INVALID_TEXT }} className={style.subText}>
          お使いの端末からログアウトします。
        </p>
        <button
          className={style.button}
          style={{ backgroundColor: COLORS.ERROR, color: COLORS.WHITE }}
        >
          ログアウト
        </button>
      </form>
    </div>
  );
};

export default LogoutModal;
