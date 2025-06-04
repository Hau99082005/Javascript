"use server";

import { auth, firestore } from "@/firebase/server";
import { bookDataSchema } from "@/validation/propertySchema";

export const saveNewProperty = async (data: {
    title: string;
    subtitle?: string;
    author: string;
    isbn: string;
    description: string;
    price: number;
    stock: number;
    pages: number;
    status: "bản nháp" | "đang bán" | "hết hàng" | "ngừng kinh doanh",
    token: string;
}) => {
  const {token, ...bookData} = data;
  const verifiedToken = await auth.verifyIdToken(data.token);

  if(!verifiedToken.admin) {
    return {
        error: true,
        message: "Unauthorized"
    }
  }

  const validation = bookDataSchema.safeParse(bookData);
  if(!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const property = await firestore.collection("properties").add({
    ...bookData,
    created: new Date(),
    updated: new Date(),
  })

  return {
    propertyId: property.id,
  }
};