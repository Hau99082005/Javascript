/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  displayName?: string;
  photoURL?: string;
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
  setAddressFormData: (
    v: GlobalContextType["addressFormData"]
  ) => void;
}

export const GlobalContext = createContext<GlobalContextType>(null!);

export default function GlobalState({ children }: { children: ReactNode }) {

  const [showNavModal, setShowNavModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<any>(null);
  const [Addresses, setAddresses] = useState<any[]>([]);
  const [addressFormData, setAddressFormData] = useState({
    name: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthUser(false);
        setUser(null);
        localStorage.removeItem("user");
        return;
      }

      setIsAuthUser(true);
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUser(JSON.parse(localUser));
        return;
      }

      try {
        const res = await fetch("/api/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Bad response");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else throw new Error("No user");
      } catch (err) {
        console.error(err);
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove("token");
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
