'use client';

import InputComponent from '@/components/FormElements/InputComponent/page';
import SelectComponent from '@/components/FormElements/SelectComponent/page';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { loginFormControls } from '@/utils';
import Link from 'next/link';
import { FaGooglePlusG } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { login } from '@/services/login/user';
import Cookies from 'js-cookie';
import { GlobalContext } from '@/context/page';
import { toast } from 'react-toastify';


const initialFormdata = {
  email: '',
  password: '',
};

export default function Page() {
  const [formData, setFormData] = useState(initialFormdata);
  const { isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      await auth?.loginWithGoogle();
      setIsAuthUser(true);
      const currentUser = auth?.currentUser;
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
        localStorage.setItem('user', JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      }
      toast.success('Đăng nhập Google thành công!');
      router.push('/');
    } catch (error) {
      console.error('Error during Google login:', error);
      setIsAuthUser(false);
      toast.error('Đăng nhập Google thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  async function handleLogin() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await login(formData);
      console.log(res);
      if (res.success) {
        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormdata);
        Cookies.set('token', res?.finalData?.token);
        localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
        localStorage.setItem('userID', res?.finalData?.user?._id);
        toast.success('Đăng nhập thành công!');
        router.push('/');
      } else {
        setIsAuthUser(false);
        toast.error('Email hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthUser(false);
      toast.error('Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push('/');
  }, [isAuthUser, router]);

  function isValidForm() {
    return (
      formData &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
    );
  }

  return (
    <form className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-semibold text-center font-serif">Đăng Nhập</p>

              <div className="w-full mt-6 space-y-8">
                {loginFormControls.map((it) =>
                  it.componentType === 'input' ? (
                    <InputComponent
                      key={it.id}
                      type={it.type}
                      label={it.label}
                      placeholder={it.placeholder}
                      value={formData[it.id]}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          [it.id]: value,
                        })
                      }
                    />
                  ) : it.componentType === 'select' ? (
                    <SelectComponent
                      key={it.id}
                      label={it.label}
                      options={it.options || []}
                      value={formData[it.id]}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          [it.id]: value,
                        })
                      }
                    />
                  ) : null
                )}

                <Button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-red-500 px-6 py-4 text-lg
                      text-white transition-all duration-200 ease-in focus:shadow font-semibold uppercase tracking-wide"
                  style={{
                    border: 'none',
                    borderRadius: '10px',
                    fontFamily: 'Lato',
                    fontSize: '20px',
                    fontWeight: 'bolder',
                  }}
                  disabled={!isValidForm() || isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
                </Button>

                <div className="flex items-center w-full gap-10">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="text-gray-500 text-sm font-medium">hoặc</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                  <Link
                    href="/register"
                    className="text-sm text-black hover:underline font-medium"
                    style={{ fontSize: '20px', textDecoration: 'none' }}
                  >
                    Đăng ký
                  </Link>
                  <Button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    variant="outline"
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
                  >
                    <FaGooglePlusG className="w-[30px] h-[30px] text-red-600" />
                    {isLoading ? 'Đang xử lý...' : 'Google'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
