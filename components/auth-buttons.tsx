"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function AuthButtons() {
  const auth = useAuth();

  if (auth?.currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
           {!!auth.currentUser.photoURL && (
            <Image src={auth.currentUser.photoURL} alt={`${auth.currentUser.displayName} avatar`} width={30} height={30}/>
           )}
           <AvatarFallback>
            {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
           </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div>{auth.currentUser.displayName}</div>
            <div className="font-normal text-xs">{auth.currentUser.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem asChild>
            <Link href={'/account'} className="text-black text-decoration-none">
            Tài Khoản
            </Link>
          </DropdownMenuItem>
          {!!auth.customClaims?.admin && (
           <DropdownMenuItem asChild>
            <Link href={'/admin-dashboard'} className="text-black text-decoration-none">
            Admin
            </Link>
          </DropdownMenuItem>
          )}
          {!!auth.customClaims?.admin && (
           <DropdownMenuItem asChild>
            <Link href={'/account/my-favourites'} className="text-black text-decoration-none">
            Yêu Thích
            </Link>
          </DropdownMenuItem>
          )}
           
          <DropdownMenuItem onClick={async() =>
            {
              await auth.logout();
            }
          }>
            <AiOutlineLogout width={30} height={30}/> Đăng Xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
   <div className="flex flex-col gap-3 items-center">
  <Link
    href="/login"
    className="text-decoration-none w-[140px] h-[40px] flex items-center justify-center text-white font-lato text-base rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-md"
  >
    Đăng nhập
  </Link>
  <Link
    href="/register"
    className="text-decoration-none w-[140px] h-[40px] flex items-center justify-center text-white font-lato text-base rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-md"
  >
    Đăng ký
  </Link>
</div>

  );
}
