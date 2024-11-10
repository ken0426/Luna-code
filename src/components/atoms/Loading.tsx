import style from '@/styles/loading/loading.module.css';

const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.spinner} />
    </div>
  );
};

export default Loading;
