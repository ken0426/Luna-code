import { ReactNode } from 'react';

import { Timestamp } from 'firebase/firestore';

export type RNChildren = {
  children: ReactNode;
};

export type Posts = {
  text: string;
  createdAt: Timestamp;
  id: string;
  userId: string;
};
