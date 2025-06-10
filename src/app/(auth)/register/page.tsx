'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputComponent from '@/components/FormElements/InputComponent/page';
import SelectComponent from '@/components/FormElements/SelectComponent/page';
import { Button } from '@/components/ui/button';
import { registerNewUser } from '@/services/register/user';
import { toast } from 'react-toastify';

export const registrationFormControls = [
  {
    id: 'name',
    label: 'Họ và tên',
    type: 'text',
    placeholder: 'Nhập họ tên',
    componentType: 'input',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Nhập email',
    componentType: 'input',
  },
  {
    id: 'password',
    label: 'Mật khẩu',
    type: 'password',
    placeholder: 'Nhập mật khẩu',
    componentType: 'input',
  },
  {
    id: 'role',
    label: 'Vai trò',
    componentType: 'select',
    options: [
      { label: 'Khách hàng', value: 'customer' },
      { label: 'Admin', value: 'admin' },
    ],
  },
];

const initialFormData: Record<string, string> = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

export default function Page() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  async function handleSubmit() {
    try {
      const data = await registerNewUser(formData);
      toast.success('Đăng ký thành công!');
      setIsRegistered(true);
    } catch (error) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.');
    }
  }

  function isFormValid() {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
  }

  function handleLoginClick() {
    router.push('/login');
  }

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 max-w-2xl relative lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-semibold text-center font-serif">
                {isRegistered ? 'Đăng ký thành công!' : 'Đăng ký tài khoản của bạn'}
              </p>

              {isRegistered ? (
                <Button
                  onClick={handleLoginClick}
                  className="inline-flex w-full items-center justify-center bg-red-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in focus:shadow font-semibold uppercase tracking-wide"
                  style={{ borderRadius: '10px' }}
                >
                  Đăng Nhập
                </Button>
              ) : (
                <div className="w-full mt-6 space-y-8">
                  {registrationFormControls.map((it) =>
                    it.componentType === 'input' ? (
                      <InputComponent
                        key={it.id}
                        type={it.type}
                        label={it.label}
                        placeholder={it.placeholder}
                        onChange={(value) => handleChange(it.id, value)}
                        value={formData[it.id] ?? ''}
                      />
                    ) : (
                      <SelectComponent
                        key={it.id}
                        label={it.label}
                        options={it.options}
                        onChange={(value) => handleChange(it.id, value)}
                        value={formData[it.id] ?? ''}
                      />
                    )
                  )}
                  <Button
                    onClick={handleSubmit}
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-red-500 px-6 py-4 text-lg text-white transition-all duration-200 ease-in focus:shadow font-semibold uppercase tracking-wide"
                    style={{
                      borderRadius: '10px',
                      fontFamily: 'Lato',
                      fontSize: '20px',
                      fontWeight: 'bolder',
                    }}
                    disabled={!isFormValid()}
                  >
                    Đăng Ký
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
