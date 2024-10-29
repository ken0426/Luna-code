'use client';

import { MouseEvent, useState } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';

import { createUserApi, loginUserApi } from '@/api/users';
import {
  DEFAULT_LOGIN_VALUE,
  DEFAULT_SIGN_UP_VALUE,
  LoginSchemaType,
  SignUpSchemaType,
  getLoginSchema,
} from '@/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';

import DefaultButton from '@/components/atoms/DefaultButton';
import TextLink from '@/components/atoms/TextLink';
import Login from '@/components/molecules/Login';
import SignUp from '@/components/molecules/SignUp';

import { COLORS } from '@/styles/index';
import style from '@/styles/login/loginArea.module.css';

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsLinkClicked, setIsTermsLinkClicked] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType | LoginSchemaType>({
    defaultValues: isSignUp ? DEFAULT_SIGN_UP_VALUE : DEFAULT_LOGIN_VALUE,
    reValidateMode: 'onChange',
    resolver: zodResolver(getLoginSchema(isSignUp)),
  });

  const onCheckBox = () => setIsChecked(!isChecked);

  const onTermsLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsTermsLinkClicked(true);
    window.open(
      'https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc',
      '_blank',
    );
  };

  const onSubmit = (data: SignUpSchemaType | LoginSchemaType) => {
    console.log(isSignUp);

    isSignUp
      ? createUserApi(data as SignUpSchemaType)
      : loginUserApi(data as LoginSchemaType);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.loginArea}>
      {isSignUp ? (
        <SignUp
          register={register as UseFormRegister<SignUpSchemaType>}
          errors={errors}
        />
      ) : (
        <Login
          register={register as UseFormRegister<LoginSchemaType>}
          errors={errors}
        />
      )}
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
          type={'submit'}
        />
      </div>
      <div className={style.textLinkArea}>
        <TextLink
          text={isSignUp ? 'ログインはこちら' : '新規登録はこちら'}
          onClick={(e) => {
            e.preventDefault();
            reset(isSignUp ? DEFAULT_LOGIN_VALUE : DEFAULT_SIGN_UP_VALUE);
            setIsSignUp(!isSignUp);
          }}
        />
      </div>
    </form>
  );
};

export default LoginForm;
