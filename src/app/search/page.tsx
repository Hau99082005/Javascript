'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SingleProductCard from '@/components/SingleProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Có lỗi xảy ra khi tìm kiếm sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  const searchQuery = searchParams.get('q');

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6" style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bold"}}>
        Kết quả tìm kiếm cho: <span className="text-red-600">"{searchQuery}"</span>
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <SingleProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 