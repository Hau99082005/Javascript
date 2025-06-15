import Cookies from "js-cookie";
import { Address } from "types/address";
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;  
  result?: T;
}

export const extract = <T,>(res: ApiResponse<T>): T | undefined =>
  res.data ?? res.result;
export const addNewAddress = async (
  formData: Omit<Address, "_id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<Address>> => {
  const res = await fetch("/api/address/add-new-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export const fetchAllAddress = async (
  id: string
): Promise<ApiResponse<Address[]>> => {
  const res = await fetch(`/api/address/get-all-address?id=${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return res.json();
};

export const updateAddress = async (
  formData: Address
): Promise<ApiResponse<Address>> => {
  const res = await fetch("/api/address/update-address", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.json();
};


export const deleteAddress = async (
  id: string
): Promise<ApiResponse<null>> => {
  const res = await fetch(`/api/address/delete-address?id=${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return res.json();
};
