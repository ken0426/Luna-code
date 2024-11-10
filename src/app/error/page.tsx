import ErrorArea from '@/components/layout/ErrorArea';

const Page = () => {
  return (
    <ErrorArea
      message={`エラーが発生しました。\n正しいURLか確認してください。`}
    />
  );
};

export default Page;
