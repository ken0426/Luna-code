'use client';

import { FC, ReactNode, createContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { auth, db } from '@/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type UserProfile = {
  userName: string;
  uid: string;
  email: string;
  sex: string;
};

type AuthState = {
  user: User | null;
  userProfile: UserProfile;
  authErrorModal: null | string;
  setAuthErrorModal: (authErrorModal: null | string) => void;
};

type Props = {
  children: ReactNode;
};

const defaultValue = {
  user: null,
  userProfile: {
    userName: '',
    uid: '',
    email: '',
    sex: '',
  },
  authErrorModal: null,
  setAuthErrorModal: () => {},
};

export const AuthContext = createContext<AuthState>(defaultValue);

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authErrorModal, setAuthErrorModal] = useState<null | string>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userName: '',
    uid: '',
    email: '',
    sex: '',
  });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const authUid = currentUser.uid;
        const userDocRef = doc(db, 'users', authUid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserProfile({
            userName: userData.userName,
            uid: userData.user_id,
            email: userData.email,
            sex: userData.sex,
          });
        }
        if (pathname === '/' || pathname === '/home') {
          router.push('/home');
        }
      } else {
        setUser(null);
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return (
    <AuthContext.Provider
      value={{ user, userProfile, authErrorModal, setAuthErrorModal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
