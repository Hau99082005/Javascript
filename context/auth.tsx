"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    currentUser:User | null;
    logout: () =>Promise<void>;
    loginWithGoogle: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user ?? null);
      });
      return () => unsubscribe();
    },[]);
    const logout = async () => {
      await auth.signOut();
      console.log(logout);
    };
    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    }
  return(
    <AuthContext.Provider value={{
    currentUser,
    logout,
    loginWithGoogle,
    
  }}>
    {children}
  </AuthContext.Provider>
  )
}

//const auth = useAuth();
//auth.currentUser;

export const useAuth = () => useContext(AuthContext);