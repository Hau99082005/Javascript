import { firestore } from "@/firebase/server";
import { BookStatus} from "@/types/propertyStatus";
import "server-only";


type GetBooksOptions = {
  filter?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minPages?: number | null;
    status?: BookStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getBooks = async (options?: GetBooksOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;

  const { minPrice, maxPrice, minPages, status } = options?.filter || {};

  let booksQuery = firestore.collection("books").orderBy("updated", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    booksQuery = booksQuery.where("price", ">=", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    booksQuery = booksQuery.where("price", "<=", maxPrice);
  }

  if (minPages !== null && minPages !== undefined) {
    booksQuery = booksQuery.where("pages", ">=", minPages);
  }

  if (status && status.length > 0) {
    booksQuery = booksQuery.where("status", "in", status);
  }

  const booksSnapshot = await booksQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const books = booksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    data: books,
  };
};