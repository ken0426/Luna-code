import DateFiled from '../atoms/DateFiled';
import SelectFiled from '../atoms/SelectFiled';
import Tag from '../atoms/Tag';
import TextFiled from '../atoms/TextFiled';

const SignUp = () => {
  return (
    <>
      <Tag size={30}>新規アカウント登録</Tag>
      <TextFiled labelName={'ユーザー名'} />
      <DateFiled />
      <SelectFiled />
      <TextFiled labelName={'メールアドレス'} type={'email'} />
      <TextFiled labelName={'パスワード'} type={'password'} />
      <TextFiled labelName={'パスワード確認'} type={'password'} />
    </>
  );
};

export default SignUp;
