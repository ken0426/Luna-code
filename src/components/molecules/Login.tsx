import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { LoginSchemaType } from '@/schema/login';

import ErrorText from '../atoms/ErrorText';
import Tag from '../atoms/Tag';
import TextFiled from '../atoms/TextFiled';

type Props = {
  register: UseFormRegister<LoginSchemaType>;
  errors: FieldErrors<LoginSchemaType>;
};

const Login: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <Tag size={30}>ログイン</Tag>
      <TextFiled
        labelName={'メールアドレス'}
        type={'email'}
        register={register('email')}
      />
      <ErrorText message={errors.email?.message} />
      <TextFiled
        labelName={'パスワード'}
        type={'password'}
        register={register('password')}
      />
      <ErrorText message={errors.password?.message} />
    </>
  );
};

export default Login;
