// Import the functions you need from the SDKs you need
import { initializeApp ,getApps} from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK09RG97ss7XbUjclEzG2r0bdnfKeb0O4",
  authDomain: "apps-21f84.firebaseapp.com",
  projectId: "apps-21f84",
  storageBucket: "apps-21f84.firebasestorage.app",
  messagingSenderId: "79318706607",
  appId: "1:79318706607:web:308d60b9ec1941e094a75a"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage:FirebaseStorage;
console.log(currentApps);

if(!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log(app); 
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export {auth, storage};
//import {auth} from "@/firebase/client";

//import {auth,storage} from '@/firebase/client'