import Tag from '../atoms/Tag';
import TextFiled from '../atoms/TextFiled';

const Login = () => {
  return (
    <>
      <Tag size={30}>ログイン</Tag>
      <TextFiled labelName={'メールアドレス'} type={'email'} />
      <TextFiled labelName={'パスワード'} type={'password'} />
    </>
  );
};

export default Login;
