import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import BookDetail from './BookDetail';
import { Book } from '../../types';

const BookRanking = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAll, setShowAll] = useState(false); // Trạng thái mở rộng

  useEffect(() => {
    const fetchBookRanking = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setBooks(data);
        setSelectedBook(data[0]);
      } catch (error) {
        console.error("Failed to fetch Books:", error);
      }
    };
    fetchBookRanking();
  }, []);

  const visibleBooks = showAll ? books : books.slice(0, 5); //Chỉ lấy 7 cuốn đầu khi chưa mở

  return (
    <div className="flex flex-col md:flex-row border-t">
      <div className="w-full md:w-1/3 border-r p-4">
        <h2 className="font-bold text-lg mb-4 text-red-600" style={{fontSize: "30px", fontFamily: "Lato", fontWeight: "bolder"}}>Văn học</h2>
        {visibleBooks.map((book, index) => (
          <BookItem
            key={book._id}
            book={book}
            index={index}
            isActive={selectedBook?._id === book._id}
            onSelect={() => setSelectedBook(book)}
          />
        ))}

        {books.length > 7 && (
          <button
            className="mt-4 px-4 py-2 border rounded text-red-600 hover:bg-red-100 text-center"
            onClick={() => setShowAll(!showAll)}
            style={{borderRadius: "5px", border: "none", fontFamily: "Lato", fontSize: "18px", fontWeight: "bolder"}}
          >
            {showAll ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
      <div className="w-full md:w-2/3 p-6">
        {selectedBook && <BookDetail book={selectedBook} />}
      </div>
    </div>
  );
};

export default BookRanking;
