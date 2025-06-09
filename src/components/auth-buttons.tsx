'use client';

import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { AiOutlineLogout } from 'react-icons/ai';
import Image from 'next/image';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { FaUser } from 'react-icons/fa';
import { GlobalContext } from '@/context/page';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthButtons() {
  const auth = useAuth();
  const { user, isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
  const router = useRouter();

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove('token');
    localStorage.clear();
    router.push('/');
  }

  if (auth?.currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {!!auth.currentUser.photoURL ? (
              <div className="relative w-full h-full">
                <Image
                  src={auth.currentUser.photoURL}
                  alt={`${auth.currentUser.displayName} avatar`}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            ) : (
              <AvatarFallback>
                {(auth.currentUser.displayName || auth.currentUser.email)?.[0] || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div>{auth.currentUser.displayName || 'User'}</div>
            <div className="font-normal text-xs">{auth.currentUser.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={'/account'} className="text-black no-underline" style={{textDecoration: "none"}}>
              Tài Khoản
            </Link>
          </DropdownMenuItem>
          {!!auth.customClaims?.admin && (
            <DropdownMenuItem asChild>
              <Link href={'/admin-dashboard'} className="text-black no-underline">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={async () => {
              await auth.logout();
              handleLogout();
            }}
          >
            <AiOutlineLogout width={30} height={30} /> Đăng Xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={'/login'} className="text-sm bg-transparent text-gray-600 border-b px-4 py-2 rounded-md uppercase">
        <FaUser style={{ width: '20px', height: '20px', color: 'gray' }} />
      </Link>
    </div>
  );
}
