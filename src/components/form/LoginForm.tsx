'use client';

import { MouseEvent, useContext, useEffect, useState } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { createUserApi, loginUserApi } from '@/api/users';
import { AuthContext } from '@/provider/AuthProvider';
import {
  DEFAULT_LOGIN_VALUE,
  DEFAULT_SIGN_UP_VALUE,
  LoginSchemaType,
  SignUpSchemaType,
  getLoginSchema,
} from '@/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';

import DefaultButton from '@/components/atoms/DefaultButton';
import Loading from '@/components/atoms/Loading';
import TextLink from '@/components/atoms/TextLink';
import Login from '@/components/molecules/Login';
import SignUp from '@/components/molecules/SignUp';

import { COLORS } from '@/styles/index';
import style from '@/styles/login/loginArea.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsLinkClicked, setIsTermsLinkClicked] = useState(false);
  const { user, setAuthErrorModal } = useContext(AuthContext);

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

  const onSubmit = async (data: SignUpSchemaType | LoginSchemaType) => {
    if (isSignUp) {
      const error = await createUserApi(data as SignUpSchemaType);
      if (error) {
        setAuthErrorModal(error);
      } else {
        reset();
        router.push('/home');
      }
    } else {
      const error = await loginUserApi(data as LoginSchemaType);
      if (error) {
        setAuthErrorModal(error);
      } else {
        reset();
        router.push('/home');
      }
    }
  };

  /** URL直打ちの場合でかつユーザーがログインしている場合、リダイレクト処理を行うため */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showComponent && !user ? (
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
  ) : (
    <Loading />
  );
};

export default LoginForm;
