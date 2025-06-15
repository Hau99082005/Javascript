'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  displayName?: string;
  photoURL?: string;
}

interface Product {
  _id: string;
  productID: {
    productName: string;
    productImage: string;
    productPrice: number;
  };
  quantity: number;
}

interface GlobalContextType {
  showNavModal: boolean;
  setShowNavModal: (v: boolean) => void;
  showCartModal: boolean;
  setShowCartModal: (v: boolean) => void;

  isAuthUser: boolean | null;
  setIsAuthUser: (v: boolean | null) => void;
  user: User | null;
  setUser: (u: User | null) => void;

  currentUpdatedProduct: any;
  setCurrentUpdatedProduct: (p: any) => void;

  Addresses: any[];
  setAddresses: (a: any[]) => void;
  addressFormData: {
    name: string;
    city: string;
    country: string;
    postalCode: string;
    address: string;
  };
  setAddressFormData: (v: GlobalContextType['addressFormData']) => void;

  cartItems: {
    data: Product[];
    success: boolean;
  };
  setCartItems: React.Dispatch<
    React.SetStateAction<{
      data: Product[];
      success: boolean;
    }>
  >;
}

export const GlobalContext = createContext<GlobalContextType>(null!);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [cartItems, setCartItems] = useState({
    data: [],
    success: true,
  });

  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<any>(null);
  const [Addresses, setAddresses] = useState<any[]>([]);
  const [addressFormData, setAddressFormData] = useState({
    name: '',
    city: '',
    country: '',
    postalCode: '',
    address: '',
  });

  // Đồng bộ giỏ hàng từ localStorage
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setIsAuthUser(false);
        setUser(null);
        localStorage.removeItem('user');
      } else {
        setIsAuthUser(true);
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else {
          try {
            const res = await fetch('/api/me', {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}` },
            });

            // Check if the response is OK and is JSON
            const contentType = res.headers.get('content-type');
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error('Response is not JSON');
            }

            const data = await res.json();
            if (data?.user) {
              setUser(data.user);
              localStorage.setItem('user', JSON.stringify(data.user));
            }
          } catch (err) {
            console.error(err);
            setIsAuthUser(false);
            setUser(null);
            Cookies.remove('token');
            localStorage.removeItem('user');
          }
        }
      }

      // Lấy cart từ localStorage
      const getCartItems = localStorage.getItem('cartItems');
      if (getCartItems) {
        try {
          const parsed = JSON.parse(getCartItems);
          if (parsed?.data && Array.isArray(parsed.data)) {
            setCartItems(parsed);
          } else if (Array.isArray(parsed)) {
            setCartItems({ data: parsed, success: true });
          }
        } catch (err) {
          console.error('Lỗi khi parse cartItems:', err);
        }
      }
    };

    fetchUser();
  }, []);

  // Lưu cart vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        showCartModal,
        setShowCartModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        Addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
