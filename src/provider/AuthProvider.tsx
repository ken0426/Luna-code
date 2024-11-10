'use client';

import { FC, ReactNode, createContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { auth } from '@/firebase';
import { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
};

type Props = {
  children: ReactNode;
};

const defaultValue = {
  user: null,
};

export const AuthContext = createContext<AuthState>(defaultValue);

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (pathname === '/' || pathname === '/home') {
          router.push('/home');
        }
      } else {
        setUser(null);
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
