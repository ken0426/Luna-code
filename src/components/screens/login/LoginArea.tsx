'use client';

import { FormEvent, MouseEvent, useState } from 'react';

import { COLORS } from '@/styles';

import DefaultButton from '@/components/atoms/DefaultButton';
import TextLink from '@/components/atoms/TextLink';
import Login from '@/components/form/Login';
import SignUp from '@/components/form/SignUp';

import style from '@/styles/login/loginArea.module.css';

const LoginArea = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsLinkClicked, setIsTermsLinkClicked] = useState(false);

  const onCheckBox = () => setIsChecked(!isChecked);

  const onTermsLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsTermsLinkClicked(true);
    window.open(
      'https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc',
      '_blank',
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={style.loginArea}>
      {isSignUp ? <SignUp /> : <Login />}
      <div className={style.buttonArea}>
        {isSignUp && (
          <label htmlFor="termsCheckbox" className={style.label}>
            <input
              id="termsCheckbox"
              type="checkbox"
              checked={isChecked}
              onChange={onCheckBox}
              disabled={!isTermsLinkClicked}
            />
            <span style={{ color: COLORS.WHITE }} className={style.messageText}>
              <span className="link" style={{ color: COLORS.LINK }}>
                <a onClick={onTermsLinkClick}>利用規約</a>
              </span>
              に同意する
            </span>
          </label>
        )}
        <DefaultButton
          text={isSignUp ? 'アカウント作成' : 'ログイン'}
          buttonColor={
            isSignUp ? (isChecked ? COLORS.BLUE : COLORS.INVALID) : COLORS.BLUE
          }
          textColor={
            isSignUp
              ? isChecked
                ? COLORS.WHITE
                : COLORS.INVALID_TEXT
              : COLORS.WHITE
          }
          disabled={isSignUp ? !isChecked : undefined}
        />
      </div>
      <div className={style.textLinkArea}>
        <TextLink
          text={isSignUp ? 'ログインはこちら' : '新規登録はこちら'}
          onClick={() => setIsSignUp(!isSignUp)}
        />
      </div>
    </form>
  );
};

export default LoginArea;
