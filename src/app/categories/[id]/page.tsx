"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productPriceOld?: number;
  tag?: string;
  volume?: string;
}

interface Category {
  _id: string;
  name: string;
  image?: string;
  desc?: string;
  parent?: string;
}

const priceRanges = [
  { label: '0đ - 150,000đ', min: 0, max: 150000 },
  { label: '150,000đ - 300,000đ', min: 150000, max: 300000 },
  { label: '300,000đ - 500,000đ', min: 300000, max: 500000 },
  { label: '500,000đ - 700,000đ', min: 500000, max: 700000 },
  { label: '700,000đ - Trở Lên', min: 700000, max: Infinity },
];

const sortOptions = [
  { label: 'Bán Chạy Tuần', value: 'bestseller' },
  { label: 'Giá tăng dần', value: 'price_asc' },
  { label: 'Giá giảm dần', value: 'price_desc' },
  { label: 'Tên A-Z', value: 'name_asc' },
  { label: 'Tên Z-A', value: 'name_desc' },
];

function Breadcrumb({ category, categories }: { category: Category | null, categories: Category[] }) {
  let crumbs: Category[] = [];
  let current: Category | null = category;
  while (current) {
    crumbs.unshift(current);
    current = current.parent ? (categories.find(c => c._id === current?.parent) || null) : null;
  }
  return (
    <nav className="text-xs md:text-sm text-gray-500 mb-2 flex items-center gap-1" aria-label="Breadcrumb">
      <span className="hover:underline cursor-pointer text-gray-500" onClick={() => window.location.href = '/'}>Trang chủ</span>
      {crumbs.map((c, i) => (
        <>
          <span className="mx-1">&gt;</span>
          <span key={c._id} className={`hover:underline cursor-pointer ${i === crumbs.length - 1 ? 'text-red-600 font-semibold' : ''}`}
            onClick={() => window.location.href = `/categories/${c._id}`}>{c.name}</span>
        </>
      ))}
    </nav>
  );
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const categoryId = params.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [sort, setSort] = useState('bestseller');
  const [perPage, setPerPage] = useState(24);
  const [showAllCats, setShowAllCats] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products?categoryId=${categoryId}`);
      const data = await res.json();
      setProducts(data.products || []);
    }
    async function fetchCategory() {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
      const found = data.find((cat: Category) => cat._id === categoryId);
      setCategory(found || null);
    }
    if (categoryId) {
      fetchProducts();
      fetchCategory();
    }
  }, [categoryId]);
  let filteredProducts = products.filter(product => {
    let matchPrice = true;
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      matchPrice = product.productPrice >= range.min && product.productPrice < range.max;
    }
    const matchSearch = search ? product.productName.toLowerCase().includes(search.toLowerCase()) : true;
    return matchPrice && matchSearch;
  });
  if (sort === 'price_asc') filteredProducts = filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
  if (sort === 'price_desc') filteredProducts = filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
  if (sort === 'name_asc') filteredProducts = filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
  if (sort === 'name_desc') filteredProducts = filteredProducts.sort((a, b) => b.productName.localeCompare(a.productName));

  filteredProducts = filteredProducts.slice(0, perPage);

 
  const handleAddToCart = (product: Product) => {
    setCart(prev => ({ ...prev, [product._id]: (prev[product._id] || 0) + 1 }));
  };

  // Lấy danh mục cha/con
  const mainCats = categories.filter(cat => !cat.parent);
  const subCategories = categories.filter(cat => cat.parent === categoryId);
  const allSubCats = (catId: string) => categories.filter(cat => cat.parent === catId);

  // Hiển thị tối đa 7 danh mục, còn lại bấm Xem Thêm
  const visibleCats = showAllCats ? mainCats : mainCats.slice(0, 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 py-4">
        {/* Sidebar */}
        <aside className="w-full md:w-60 bg-white rounded-lg shadow border border-gray-200 p-4 flex-shrink-0 mb-4 md:mb-0">
          <div className="mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest" style={{fontFamily: "Lato", fontSize: "16px",
            fontWeight: "bold"
          }}
          >NHÓM SẢN PHẨM</div>
          <ul className="space-y-0.5 mb-2">
            <li>
              <button
                className={`w-full text-left px-3 py-1.5 rounded-l-lg font-semibold text-gray-700 hover:bg-gray-50 border-l-4 ${!category ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent'}`}
                onClick={() => router.push('/categories/all')}
              >
                All Category
              </button>
            </li>
            {visibleCats.map(cat => (
              <li key={cat._id}>
                <button
                  className={`w-full text-left px-3 py-1.5 rounded-l-lg font-semibold border-l-4 transition-all duration-100 ${cat._id === categoryId ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => router.push(`/categories/${cat._id}`)}
                >
                  {cat.name}
                </button>
                {/* Danh mục con */}
                {cat._id === categoryId && allSubCats(cat._id).length > 0 && (
                  <ul className="ml-2 mt-0.5 space-y-0.5">
                    {allSubCats(cat._id).map(sub => (
                      <li key={sub._id}>
                        <button
                          className={`w-full text-left px-3 py-1.5 rounded-l-lg font-normal border-l-4 text-sm ${sub._id === categoryId ? 'border-red-500 text-red-600 bg-red-50' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => router.push(`/categories/${sub._id}`)}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {mainCats.length > 7 && (
              <li>
                <button className="w-full text-left px-3 py-1.5 text-blue-500 hover:underline text-sm" onClick={() => setShowAllCats(v => !v)}>
                  {showAllCats ? 'Ẩn bớt' : 'Xem Thêm'}
                </button>
              </li>
            )}
          </ul>
          <div className="mb-1 mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">GIÁ</div>
          <div className="flex flex-col gap-1 mb-2">
            {priceRanges.map((range, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer text-gray-700 text-xs">
                <input
                  type="radio"
                  checked={selectedPrice === idx}
                  onChange={() => setSelectedPrice(idx)}
                  className="accent-red-500"
                />
                {range.label}
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-xs">
              <input
                type="radio"
                checked={selectedPrice === null}
                onChange={() => setSelectedPrice(null)}
                className="accent-red-500"
              />
              Tất cả
            </label>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1">
          <Breadcrumb category={category} categories={categories} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="text-lg md:text-xl font-bold text-gray-800 mb-1">
              {category ? category.name : 'Tất cả sản phẩm'}
            </div>
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-xs text-gray-500 mr-1">Sắp xếp theo:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
                style={{ fontFamily: 'Lato' }}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={perPage}
                onChange={e => setPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-400"
                style={{ fontFamily: 'Lato' }}
              >
                {[12, 24, 36, 48].map(n => (
                  <option key={n} value={n}>{n} sản phẩm</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-400 ml-1"
                style={{ fontFamily: 'Lato', minWidth: 120 }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.length === 0 && <div className="col-span-full text-center text-gray-500 text-sm">Không có sản phẩm nào.</div>}
            {filteredProducts.map(product => {
              const hasDiscount = product.productPriceOld && product.productPriceOld > product.productPrice;
              const discount = hasDiscount ? Math.round(((product.productPriceOld! - product.productPrice) / product.productPriceOld!) * 100) : 0;
              return (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(255,0,64,0.10)' }}
                  className="bg-white border-2 border-transparent hover:border-red-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-4 flex flex-col items-center group cursor-pointer relative min-h-[320px]"
                  style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}
                >
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.tag && (
                      <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">{product.tag}</span>
                    )}
                    {hasDiscount && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">-{discount}%</span>
                    )}
                    {product.volume && (
                      <span className="bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">Tập {product.volume}</span>
                    )}
                  </div>
                  {/* Image with overlay zoom icon */}
                  <div
                    className="w-full aspect-square flex items-center justify-center mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-red-50 group-hover:to-white transition relative cursor-zoom-in border border-gray-100"
                    onClick={() => setZoomImage(product.productImage)}
                    title="Phóng to ảnh"
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="object-contain w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-200 rounded-xl group-hover:scale-110"
                      style={{ background: '#f8f8f8' }}
                    />
                    {/* Overlay zoom icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    >
                      <svg width="38" height="38" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" fill="none"/><path d="M15.5 15.5L19 19" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M11 8a3 3 0 100 6 3 3 0 000-6z" stroke="white" strokeWidth="2"/></svg>
                    </motion.div>
                  </div>
                  <div className="font-semibold text-sm text-gray-800 mb-1 text-center line-clamp-2 h-10" style={{ fontFamily: 'Lato' }}>
                    {product.productName}
                  </div>
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-lg font-bold text-red-500" style={{ fontFamily: 'Lato' }}>
                      {product.productPrice.toLocaleString()}₫
                    </span>
                    {hasDiscount && (
                      <span className="text-gray-400 text-xs line-through mt-0.5" style={{ fontFamily: 'Lato' }}>
                        {product.productPriceOld?.toLocaleString()}₫
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 mt-auto rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center justify-center shadow-lg hover:from-pink-500 hover:to-red-600 transition-all duration-150 ring-2 ring-white hover:ring-red-300 text-xl"
                    style={{ fontFamily: 'Lato' }}
                    title="Thêm vào giỏ hàng"
                  >
                   <FaShoppingCart/>
                  </button>
                  {cart[product._id] && (
                    <div className="mt-2 text-green-600 font-semibold text-xs">Đã thêm: {cart[product._id]}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Zoom Modal hiện đại */}
          <AnimatePresence>
            {zoomImage && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoomImage(null)}
              >
                <motion.div
                  className="relative bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-red-100"
                  style={{ width: 420, height: 420, maxWidth: '92vw', maxHeight: '92vw', aspectRatio: '1/1' }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-100 transition text-gray-700 hover:text-red-500 text-2xl"
                    onClick={() => setZoomImage(null)}
                    title="Đóng"
                  >
                    <IoMdClose size={28} />
                  </button>
                  <img
                    src={zoomImage}
                    alt="Zoomed"
                    className="object-contain w-full h-full rounded-2xl"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
} 