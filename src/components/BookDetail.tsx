import React, { useState } from 'react';
import { Book } from '../../types';
import { ShoppingCart, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Props {
  book: Book;
  onAddToCart?: (book: Book, quantity: number) => void;
}

const BookDetail: React.FC<Props> = ({ book, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const discount = Math.round(100 - (book.productPrice / book.productPriceOld) * 100);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(book, quantity);
    } else {
      toast.success(`Đã thêm "${book.productName}" (${quantity}) vào giỏ hàng!`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <img
            src={book.productImage}
            alt={book.productName}
            className="w-56 aspect-[3/4] object-cover rounded shadow cursor-zoom-in hover:scale-105 transition-transform"
          />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-xl max-w-3xl w-full">
            <Dialog.Title asChild>
              <VisuallyHidden>Ảnh phóng to của sách {book.productName}</VisuallyHidden>
            </Dialog.Title>
            <div className="flex justify-end">
             <Button onClick={() => setOpen(false)}
             className="text-white hover:bg-red-600 transition-all duration-200 shadow-md"
             style={{
             backgroundColor: "#ef4444", 
             border: "none",
             borderRadius: "5px",
             width: "36px",
             height: "36px",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             }}>
            <X size={20} />
            </Button>
            </div>
            <img
              src={book.productImage}
              alt={book.productName}
              className="w-full max-h-[80vh] object-contain rounded"
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Lato', fontSize: '25px' }}>
          {book.productName}
        </h2>
      <div className="flex items-center gap-2" style={{ fontFamily: 'Lato' }}>
       <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Mã sách:</span>
       <span style={{ fontSize: '18px' }}>{book.productcode}</span>
      </div>
        <div className="flex items-center gap-2" style={{ fontFamily: 'Lato' }}>
       <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Tác giả:</span>
       <span style={{ fontSize: '18px' }}>{book.actor}</span>
      </div>
        <div
          className="text-lg font-semibold text-red-600"
          style={{ fontFamily: 'Lato', fontSize: '25px' }}
        >
          {book.productPrice.toLocaleString('de-DE')} ₫
        </div>
        <div
          className="text-sm line-through text-gray-500"
          style={{ fontFamily: 'Lato', fontSize: '18px' }}
        >
          {book.productPriceOld.toLocaleString('de-DE')} ₫
        </div>
        <div className="inline-block text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
          -{discount}%
        </div>

        <p
          className="mt-4 text-justify text-sm text-gray-500"
          style={{ fontFamily: 'Lato', fontSize: '20px' }}
        >
          {book.description}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-20 p-2 border rounded-md text-center"
          />
          <Button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-5 py-2 bg-red-400 hover:bg-red-700 text-white rounded-md shadow transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ border: 'none', borderRadius: '10px' }}
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
