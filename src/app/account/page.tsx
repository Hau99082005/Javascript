"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/page";
import InputComponent from "@/components/FormElements/InputComponent/page";
import { Button } from "@/components/ui/button";
import { addNewAddress, extract } from "@/services/address/address";
import { addNewAddressFormControls } from "@/utils";
import { toast, ToastContainer } from "react-toastify";
import { MapPin, Trash2, Pencil, PlusCircle, CheckCircle2, Upload } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import type { Address } from "types/address";
import { Input } from "@/components/ui/input";

function AddressCard({ data, onEdit, onDelete }: { data: Address; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-indigo-300">
      <div className="mb-3 flex items-center gap-3 text-gray-800">
        <MapPin className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold"
        style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"}}>
          {data.name}</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">📍 {data.address}</p>
        <p className="flex items-center gap-2">🏙️ {data.city}, {data.country}</p>
        <p className="flex items-center gap-2">📮 {data.postalCode}</p>
      </div>
      <div className="mt-5 flex justify-end gap-3">
        <Button onClick={onEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Pencil className="mr-2 h-4 w-4" /> Cập nhật
        </Button>
        <Button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white" variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Xoá
        </Button>
      </div>
    </div>
  );
}

function AddressForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user, addressFormData, setAddressFormData, setAddresses } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    try {
      setLoading(true);
      const res = await addNewAddress({ ...addressFormData, userID: user?._id! });
      const newAddr = extract(res);

      if (res.success && newAddr) {
        toast.success(<span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Đã thêm địa chỉ thành công!</span>, {
          style: { backgroundColor: "#10b981", color: "#fff" },
        });
        setAddressFormData({ name: "", city: "", country: "", postalCode: "", address: "" });
        setAddresses((prev: Address[]) => [...prev, newAddr]);
        onSuccess();
      } else {
        toast.error(res.message || "Lỗi khi thêm địa chỉ", { theme: "colored" });
      }
    } catch {
      toast.error("Đã có lỗi xảy ra", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Thêm địa chỉ mới</h2>
        <div className="space-y-5">
          {addNewAddressFormControls.map((item) => (
            <InputComponent
              key={item.id}
              type={item.type}
              placeholder={item.placeholder}
              label={item.label}
              value={addressFormData[item.id as keyof typeof addressFormData]}
              onChange={(val) => setAddressFormData({ ...addressFormData, [item.id]: val })}
              className="w-full"
            />
          ))}
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100" onClick={onClose}>Huỷ</Button>
          <Button disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleAdd}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  const { user, Addresses = [] } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const addressList = (Addresses as Address[]).filter(Boolean);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-8 py-16 bg-gradient-to-br from-gray-50 to-white">
      <header className="mb-12 flex items-center gap-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-4xl font-bold text-red-700 overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              user?.name?.charAt(7).toUpperCase()
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700">
            <Upload className="h-5 w-5 text-white" />
            <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 uppercase" style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bold"}}>{user?.name}</h1>
          <p className="text-md text-gray-600" 
          style={{fontFamily: "Lato", fontSize: '18px', fontWeight: "lighter"}}>{user?.email}</p>
          <p className="text-sm uppercase text-gray-500"
          style={{fontFamily: "Lato", fontSize: "18px"}}>{user?.role}</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-md text-white px-6 py-3"
        style={{border: "none", borderRadius: "10px", fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>Xem đơn đặt hàng</Button>
      </header>

      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900"
        style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"}}>Địa chỉ của bạn</h2>
        <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
          style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}>
          <PlusCircle className="mr-2 h-5 w-5" /> Thêm địa chỉ mới
        </Button>
      </div>

      {addressList.length ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {addressList.map((addr) => (
            <AddressCard key={addr._id} data={addr} onEdit={() => {}} onDelete={() => {}} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-yellow-50 px-8 py-5 text-md text-yellow-800"
        style={{border: "none", fontFamily: "Lato", fontSize: "20px"}}>Không có địa chỉ nào. Hãy thêm địa chỉ mới bên trên!</p>
      )}

      {showForm && <AddressForm onClose={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}