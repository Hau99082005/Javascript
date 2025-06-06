"use client";

import { FaGooglePlusG } from "react-icons/fa";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
    const auth = useAuth();
    return(
        <Button
  onClick={() => {
    auth?.loginWithGoogle();
  }}
  className="w-full flex items-center justify-center gap-2 px-5 py-3
   text-white bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl shadow-md hover:shadow-lg active:scale-95"
style={{border: "none", borderRadius: "10px"}}>
  <FaGooglePlusG className="text-white text-2xl" />
  <span className="font-medium text-base">Đăng nhập với Google</span>
</Button>
    )
}