/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  email?: string;
  name?: string;
  _id?: string;
  role?: string;
}

interface GlobalContextType {
  showNavModal: boolean;
  setShowNavModal: (value: boolean) => void;
  isAuthUser: boolean | null;
  setIsAuthUser: (value: boolean | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        setIsAuthUser(true);
        try {
          const res = await fetch('/api/login', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (data && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
            setIsAuthUser(false);
          }
        } catch (err) {
          setUser(null);
          setIsAuthUser(false);
        }
      } else {
        setIsAuthUser(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ showNavModal, setShowNavModal, isAuthUser, setIsAuthUser, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
