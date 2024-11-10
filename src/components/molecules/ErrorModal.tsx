'use client';

import { useContext } from 'react';

import { AuthContext } from '@/provider/AuthProvider';
import { PostContext } from '@/provider/PostProvider';
import { COLORS } from '@/styles';

import style from '@/styles/modal/errorModal.module.css';

const ErrorModal = () => {
  const { postErrorModal, setPostErrorModal } = useContext(PostContext);
  const { authErrorModal, setAuthErrorModal } = useContext(AuthContext);

  return (
    <div
      style={{
        display: !!postErrorModal || !!authErrorModal ? 'block' : 'none',
      }}
      className={style.background}
    >
      <div style={{ backgroundColor: COLORS.BLACK }} className={style.modal}>
        <p style={{ color: COLORS.WHITE }} className={style.text}>
          エラー
        </p>
        <p style={{ color: COLORS.INVALID_TEXT }} className={style.subText}>
          {postErrorModal ?? authErrorModal}
        </p>
        <button
          onClick={() => {
            if (postErrorModal) {
              setPostErrorModal(null);
            }
            if (authErrorModal) {
              setAuthErrorModal(null);
            }
          }}
          className={style.button}
          style={{ backgroundColor: COLORS.BLUE, color: COLORS.WHITE }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
