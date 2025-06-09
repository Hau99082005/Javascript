import React from 'react';
import { Book } from '../../types';

interface Props {
  book: Book;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

const BookItem: React.FC<Props> = ({ book, index, isActive, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-100 rounded ${
        isActive ? 'bg-red-50' : ''
      }`}
    >
      <div className="text-xl font-bold text-red-600 w-6">{String(index + 1).padStart(2, '0')}</div>
      <img src={book.productImage} alt={book.productName} className="w-10 h-14 object-cover" />
      <div>
        <div className="font-medium" style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>{book.productName}</div>
        <div className="text-sm text-gray-600" style={{fontFamily: "Lato", fontSize: "16px", fontWeight: "lighter"}}>{book.actor}</div>
      </div>
    </div>
  );
};

export default BookItem;
