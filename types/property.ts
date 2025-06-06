import { BookStatus } from "./propertyStatus";

export type Property = {
    id: string;
    title: string;
    subtitle?: string;
    author: string;
    isbn: string;
    price: number;
    description: string;
    stock: number;
    pages: number;
    status: BookStatus
}