'use client'

import InputComponent from '@/components/FormElements/InputComponent/page'
import { GlobalContext } from '@/context/page'
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from '@/services/address/address'
import { addNewAddressFormControls } from '@/utils'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import ComponentLevelLoader from '@/components/Loader/componentlevel'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Account() {
  const {
    user,
    Addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
  } = useContext(GlobalContext)

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [currentEditedAddressId, setCurrentEditedAddressId] =
    useState(null)
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: '',
  })
  const [pageLevelLoader, setPageLevelLoader] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(
    null,
  )
  const [isUploading, setIsUploading] = useState(false)

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: '' })
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({
            ...addressFormData,
            userID: user?._id,
          })
    console.log(res)

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.success(res.message, {
        position: 'top-right',
      })
      setAddressFormData({
        name: '',
        city: '',
        country: '',
        postalCode: '',
        address: '',
      })
      extractAllAddress()
      setCurrentEditedAddressId(null)
    } else {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.error(res.message, {
        position: 'top-right',
      })
      setAddressFormData({
        name: '',
        city: '',
        country: '',
        postalCode: '',
        address: '',
      })
    }
  }

  async function extractAllAddress() {
    setPageLevelLoader(true)
    const res = await fetchAllAddresses(user?._id)
    if (res.success) {
      setPageLevelLoader(false)
      setAddresses(res.data)
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true)
    setAddressFormData({
      name: getCurrentAddress.name,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    })
    setCurrentEditedAddressId(getCurrentAddress._id)
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({
      loading: true,
      id: getCurrentAddressID,
    })
    const res = await deleteAddress(getCurrentAddressID)
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.success(res.message, {
        position: 'top-right',
      })
      extractAllAddress()
    } else {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.error(res.message, {
        position: 'top-right',
      })
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddress()
  }, [user])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      try {
        const imageUrl = URL.createObjectURL(file)
        setProfileImage(imageUrl)
        toast.success('Ảnh đã được tải lên thành công!', {
          position: 'top-right',
        })
      } catch (error) {
        toast.error('Có lỗi khi tải ảnh lên!', {
          position: 'top-right',
        })
      }
      setIsUploading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-12">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
                      <span className="text-4xl text-white font-bold uppercase"
                      style={{fontFamily: "Lato", fontSize: "50px", fontWeight: "bold"}}>
                        {user?.name?.charAt(7)}
                      </span>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="imageUpload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <span className="text-white text-sm font-medium">
                    Thay đổi ảnh
                  </span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 uppercase"
              style={{fontFamily: "Lato", fontWeight: "bold", fontSize: "25px"}}>
                {user?.name}
              </h2>
              <p className="text-gray-600 mb-2"
              style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>{user?.email}</p>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800"
              style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>
                {user?.role}
              </span>
            </div>

            <div className="flex justify-center mb-8">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-sm"
              style={{border: "none", borderRadius: "10px", fontWeight: "bold", fontFamily: "Lato", fontSize: "20px"}}>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Xem đơn hàng của bạn
              </button>
            </div>
            <div className="mt-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900"
                style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bold"}}>
                  Địa chỉ của bạn
                </h2>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-sm"
                 style={{border: "none", borderRadius: "10px", fontFamily: "Lato", fontSize: "20px"}}>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  {showAddressForm
                    ? 'Ẩn Địa Chỉ'
                    : 'Thêm mới địa chỉ'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Addresses && Addresses.length ? (
                  Addresses.map((item) => (
                    <div
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                      key={item._id}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900 uppercase"
                          style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>
                            {item.name}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() =>
                                handleUpdateAddress(item)
                              }
                              className="p-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-200
                              bg-transparent" style={{fontSize: "30px", fontWeight: "bold", fontFamily: "Lato"}}
                            >
                              <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </Button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                            >
                              {componentLevelLoader &&
                              componentLevelLoader.loading &&
                              componentLevelLoader.id === item._id ? (
                                <ComponentLevelLoader
                                  text="Delete"
                                  color="#ffffff"
                                  loading={
                                    componentLevelLoader &&
                                    componentLevelLoader.loading
                                  }
                                  size="small"
                                />
                              ) : (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600" style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>
                         Địa Chỉ:  {item.address}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                          <p style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>Thành phố: {item.city}</p>
                          <p style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>Quốc gia: {item.country}</p>
                          <p style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "lighter"}}>Mã bưu chính: {item.postalCode}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">
                      Không tìm thấy địa chỉ nào! Vui lòng thêm vào
                      một địa chỉ mới
                    </p>
                  </div>
                )}
              </div>
            </div>
            {showAddressForm && (
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  {currentEditedAddressId
                    ? 'Cập nhật địa chỉ'
                    : 'Thêm địa chỉ mới'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(value: string) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: value,
                        })
                      }
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleAddOrUpdateAddress}
                    className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                  >
                    {componentLevelLoader &&
                    componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text="Lưu Lại"
                        color="#ffffff"
                        loading={
                          componentLevelLoader &&
                          componentLevelLoader.loading
                        }
                        size="small"
                      />
                    ) : (
                      'Lưu'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}
