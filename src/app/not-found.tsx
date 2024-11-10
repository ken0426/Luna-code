'use client';

import { useEffect, useState } from 'react';

const NotFound = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showComponent ? (
    <div style={{ color: 'white' }}>{'ページが存在しません'}</div>
  ) : (
    <></>
  );
};

export default NotFound;
