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
            <Link href={'/account'}>
            Tài Khoản
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href={'/admin'}>
            Admin
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href={'/account/my-favourites'}>
            Yêu Thích
            </Link>
          </DropdownMenuItem>
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
    <div className="flex flex-col gap-1 text-sm font-medium">
      <Link
        href="/login"
        className="hover:underline text-black font-lato text-base"
      >
        Đăng nhập
      </Link>
      <Link
        href="/register"
        className="hover:underline text-black font-lato text-base"
      >
        Đăng ký
      </Link>
    </div>
  );
}
