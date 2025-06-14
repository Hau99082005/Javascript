/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  email?: string;
  name?: string;
  _id?: string;
  role?: string;
  displayName?: string;
  photoURL?: string;
}

interface GlobalContextType {
  showNavModal: boolean;
  setShowNavModal: (value: boolean) => void;
  isAuthUser: boolean | null;
  setIsAuthUser: (value: boolean | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  currentUpdatedProduct: any;
  setCurrentUpdatedProduct: (product: any) => void;
  showCartModal: boolean;
  setShowCartModal: (value: boolean) => void;
}



export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<any>(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        setIsAuthUser(true);
        // Ưu tiên lấy user từ localStorage nếu có
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else {
          // Nếu không có thì gọi API /api/me
          try {
            const res = await fetch('/api/me', {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              method: 'GET',
            });
            
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Response was not JSON');
            }
            
            const data = await res.json();
            if (data && data.user) {
              setUser(data.user);
              localStorage.setItem('user', JSON.stringify(data.user));
            } else {
              setUser(null);
              setIsAuthUser(false);
              localStorage.removeItem('user');
            }
          } catch (err) {
            console.error('Error fetching user:', err);
            setUser(null);
            setIsAuthUser(false);
            localStorage.removeItem('user');
            Cookies.remove('token');
          }
        }
      } else {
        setIsAuthUser(false);
        setUser(null);
        localStorage.removeItem('user');
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider 
      value={{ 
        showNavModal, 
        setShowNavModal, 
        isAuthUser, 
        setIsAuthUser, 
        user, 
        setUser,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
  