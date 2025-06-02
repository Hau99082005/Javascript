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
        className="w-full"
        >
            <FaGooglePlusG width={30} height={30}/>
             Đăng Nhập với Google
        </Button>
    )
}