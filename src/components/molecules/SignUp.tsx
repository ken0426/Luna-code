import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { SignUpSchemaType } from '@/schema/login';

import DateFiled from '../atoms/DateFiled';
import ErrorText from '../atoms/ErrorText';
import SelectFiled from '../atoms/SelectFiled';
import Tag from '../atoms/Tag';
import TextFiled from '../atoms/TextFiled';

type Props = {
  register: UseFormRegister<SignUpSchemaType>;
  errors: FieldErrors<SignUpSchemaType>;
};

const SignUp: FC<Props> = ({ register, errors }) => {
  return (
    <>
      <Tag size={30}>新規アカウント登録</Tag>
      <TextFiled labelName={'ユーザー名'} register={register('userName')} />
      <ErrorText message={errors.userName?.message} />
      <DateFiled register={register('date')} />
      <ErrorText message={errors.date?.message} />
      <SelectFiled register={register('sex')} />
      <ErrorText message={errors.sex?.message} />
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
      <TextFiled
        labelName={'パスワード確認'}
        type={'password'}
        register={register('passwordConfirm')}
      />
      <ErrorText message={errors.passwordConfirm?.message} />
    </>
  );
};

export default SignUp;
