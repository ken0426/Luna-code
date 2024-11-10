'use client';

import { useEffect, useState } from 'react';

import ErrorArea from '@/components/layout/ErrorArea';

const NotFound = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showComponent ? <ErrorArea message={'ページが存在しません'} /> : <></>;
};

export default NotFound;
