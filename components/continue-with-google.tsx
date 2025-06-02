"use client";

import { FaGooglePlusG } from "react-icons/fa";
import { Button } from "./ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/client";

export default function ContinueWithGoogleButton() {
    return(
        <Button
        onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
        }}
        >
            <FaGooglePlusG width={30} height={30}/>
        </Button>
    )
}