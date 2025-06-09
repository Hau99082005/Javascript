"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, ParsedToken, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { removeToken, setToken } from "./actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AuthContextType = {
    currentUser:User | null;
    logout: () =>Promise<void>;
    loginWithGoogle: () => Promise<void>;
    customClaims: ParsedToken | null;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged( async(user) => {
        setCurrentUser(user ?? null);
        if(user)  {
          const tokenResult = await user.getIdTokenResult();
          const token = tokenResult.token;
          const refreshToken = user.refreshToken;
          console.log(token);
          console.log(refreshToken);
          const claims = tokenResult.claims;

          setCustomClaims(claims ?? null);
           await fetch("/api/set-token", {
           method: "POST",
           headers: {
           "Content-Type": "application/json",
           },
           body: JSON.stringify({ token, refreshToken }),
           });
          if(token && refreshToken) {
            await setToken({
               token,
               refreshToken,
            });
          }
        }else {
          await removeToken();
        }
      });
      return () => unsubscribe();
    },[]);
    const logout = async () => {
      await auth.signOut();
      console.log(logout);
      toast.success("Đăng Xuất Thành Công!");
    };
    const loginWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account'
        });
        const result = await signInWithPopup(auth, provider);
        if (result.user) {
          toast.success(`Đã Đăng Nhập Google Thành Công! ${auth.currentUser?.displayName}`);
        }
      } catch (error) {
        console.error('Error during Google login:', error);
        throw error;
      }
    }
  return(
    <AuthContext.Provider value={{
    currentUser,
    logout,
    loginWithGoogle,
    customClaims,
  }}>
    {children}
  </AuthContext.Provider>
  )
}

//const auth = useAuth();
//auth.currentUser;

export const useAuth = () => useContext(AuthContext);