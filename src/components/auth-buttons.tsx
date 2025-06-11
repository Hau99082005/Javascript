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
import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface GlobalContextType {
  showNavModal: boolean;
  setShowNavModal: (show: boolean) => void;
  user: any;
  isAuthUser: boolean;
  setIsAuthUser: (isAuth: boolean) => void;
  setUser: (user: any) => void;
  currentUpdatedProduct: any;
  setCurrentUpdatedProduct: (product: any) => void;
  showCartModal: boolean;
  setShowCartModal: (show: boolean) => void;
}

export default function AuthButtons() {
  const auth = useAuth();
  const { showNavModal, setShowNavModal } = useContext(GlobalContext) as GlobalContextType;
  const {user, isAuthUser, setIsAuthUser, setUser, currentUpdatedProduct, setCurrentUpdatedProduct, showCartModal, setShowCartModal
    } = useContext(GlobalContext) as GlobalContextType;
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if(pathname !== "/admin/add-product" && currentUpdatedProduct !== null)
      setCurrentUpdatedProduct(null);
  },[pathname]);

  const isAdmin = pathname.includes('admin');

  async function handleLogout() {
    try {
      if (auth?.logout) {
        await auth.logout();
      }
      setIsAuthUser(false);
      setUser(null);
      Cookies.remove('token');
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  if (auth?.currentUser || (isAuthUser && user)) {
    const displayName = auth?.currentUser?.displayName || user?.name || 'User';
    const email = auth?.currentUser?.email || user?.email;
    const photoURL = auth?.currentUser?.photoURL;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {!!photoURL ? (
              <div className="relative w-full h-full">
                <Image
                  src={photoURL}
                  alt={`${displayName} avatar`}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            ) : (
             <AvatarFallback
  style={{
    border: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#f0f0f0",
    color: "red",
    fontWeight: "bold",
    fontSize: "1.2rem",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
     }}
      >
      {displayName?.split(' ').pop()?.charAt(0).toUpperCase() || 'H'}
        </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div>{displayName}</div>
            <div className="font-normal text-xs">{email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!isAdmin && isAuthUser && (
            <DropdownMenuItem asChild>
              <button onClick={() => router.push('/account')} className="text-black no-underline w-full text-left">
                Tài Khoản
              </button>
            </DropdownMenuItem>
          )}
          {user?.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="text-black no-underline w-full text-left"
              style={{textDecoration: "none", fontFamily: "Lato"}}>
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <button
              onClick={handleLogout}
              className="w-full text-left text-black no-underline"
            >
              <div className="flex items-center gap-2">
                <AiOutlineLogout width={20} height={20} />
                <span>Đăng Xuất</span>
              </div>
            </button>
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
