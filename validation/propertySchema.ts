import { z } from "zod";

export const bookDataSchema = z.object({
  title: z.string().min(1, "Tiêu đề sách phải chứa ít nhất 1 ký tự"),
  subtitle: z.string().optional(),
  author: z.string().min(3, "Tên tác giả phải chứa ít nhất 3 ký tự"),
  isbn: z.string().refine((isbn) => {
    const isbnRegex = /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|[0-9]{10}$)(?:[0-9]+[- ]?){3}[0-9]*[X0-9]$/i;
    return isbnRegex.test(isbn);
  }, "ISBN không hợp lệ!"),
  price: z.coerce.number().positive("Giá tiền phải lớn hơn 0"),
  description: z.string().min(60, "Mô tả sách phải chứa ít nhất 60 ký tự"),
  stock: z.coerce.number().min(0, "Số lượng tồn kho phải lớn hơn hoặc bằng 0"),
  pages: z.coerce.number().min(1, "Số trang phải lớn hơn 0"),
  status: z.enum(["bản nháp", "đang bán", "hết hàng", "ngừng kinh doanh"], {
    errorMap: () => ({ message: "Trạng thái không hợp lệ!" }),
  }),
});