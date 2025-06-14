// src/components/ProductCard.tsx
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaEye, FaSearchPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { addToCart } from "@/services/cart/cart";
import { GlobalContext } from "@/context/page";
import Cookies from 'js-cookie';

interface Product {
  _id: string; // Ensure _id is included
  productImage: string;
  productName: string;
  productPrice: number;
  productPriceOld?: number;
  productcode: string;
}

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(GlobalContext);
  const [modalImage, setModalImage] = useState<string>("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch Product:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = (index: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [index]: value }));
  };

  const handleZoom = (img: string) => {
    setModalImage(img);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  async function handleAddToCart(product: Product, index: number) {
    if (!user?._id) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      return;
    }

    try {
      const quantity = quantities[index] || 1;
      const res = await addToCart({
        productID: product._id,
        userID: user._id,
        quantity,
      });

      if (res.success) {
        toast.success(res.message);
        if (res.cartCount !== undefined) {
          updateCartCount(res.cartCount);
        }
      } else {
        toast.error(res.message || "Thêm vào giỏ hàng thất bại!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {products.map((product, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100 shadow-lg border-0 rounded-4 product-card position-relative bg-white"
              style={{
                overflow: "hidden",
                transition: "box-shadow 0.3s, transform 0.3s",
                minHeight: 420,
              }}
            >
              <div className="position-relative">
                <Link href={`/products/${encodeURIComponent(product.productcode)}`} className="d-block">
                  <Image
                    src={
                      product.productImage.startsWith("http")
                        ? product.productImage
                        : product.productImage.startsWith("/")
                        ? product.productImage
                        : "/" + product.productImage
                    }
                    className="card-img-top object-fit-cover product-img-hover"
                    alt={product.productName}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1.2rem",
                      borderTopRightRadius: "1.2rem",
                      transition: "transform 0.3s",
                    }}
                    width={350}
                    height={220}
                  />
                </Link>
                <Link
                  href={`/products/${encodeURIComponent(product.productcode)}`}
                  className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow d-flex align-items-center justify-content-center product-icon-hover"
                  style={{ width: 42, height: 42, zIndex: 2, border: "2px solid #eee" }}
                  title="Xem chi tiết"
                >
                  <FaEye size={20} color="#e74c3c" />
                </Link>
                <button
                  className="btn btn-light position-absolute top-0 start-0 m-2 rounded-circle shadow d-flex align-items-center justify-content-center product-icon-hover"
                  style={{ width: 42, height: 42, zIndex: 2, border: "2px solid #eee" }}
                  title="Phóng to ảnh"
                  onClick={() =>
                    handleZoom(
                      product.productImage.startsWith("http")
                        ? product.productImage
                        : product.productImage.startsWith("/")
                        ? product.productImage
                        : "/" + product.productImage
                    )
                  }
                >
                  <FaSearchPlus size={20} color="#2980d9" />
                </button>
              </div>
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <h6
                  className="card-title text-truncate mb-2"
                  title={product.productName}
                  style={{ fontWeight: 700, fontSize: 18, color: "#222" }}
                >
                  {product.productName}
                </h6>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="text-danger fw-bold" style={{ fontSize: 20 }}>
                    {product.productPrice.toLocaleString("de-DE")}đ
                  </span>
                  {product.productPriceOld && (
                    <small className="text-muted text-decoration-line-through" style={{ fontSize: 15 }}>
                      {product.productPriceOld.toLocaleString("de-DE")}đ
                    </small>
                  )}
                </div>
                <div className="d-flex flex gap-2 align-items-center mb-3 text-center justify-center w-full max-[300px]:">
                  <Input
                    type="number"
                    min={1}
                    value={quantities[index] || 1}
                    onChange={(e) => handleQuantityChange(index, Math.max(1, Number(e.target.value)))}
                    className="form-control form-control-sm w-50 rounded-pill border-2 border-primary text-center justify-center align-items-center"
                    style={{ fontSize: 16, background: "#f8f9fa" }}
                  />
                </div>
                <Button
                  onClick={() => handleAddToCart(product, index)}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold rounded-pill py-2 mt-auto product-cart-btn"
                  style={{
                    fontSize: 17,
                    background: "linear-gradient(90deg, #e74c3c 0%, #f39c12 100%)",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(231,76,60,0.08)",
                  }}
                >
                  <FaShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        ))}
        <style jsx global>{`
          .product-card {
            transition: box-shadow 0.25s, transform 0.25s;
          }
          .product-card:hover {
            box-shadow: 0 12px 36px rgba(231,76,60,0.13), 0 2px 8px rgba(44,62,80,0.08);
            transform: translateY(-4px) scale(1.03);
            z-index: 2;
          }
          .product-img-hover:hover {
            transform: scale(1.07);
            filter: brightness(1.08);
          }
          .product-icon-hover:hover {
            background: #f8f9fa;
            border-color: #e74c3c;
            box-shadow: 0 2px 8px rgba(231,76,60,0.13);
          }
          .product-cart-btn:hover {
            background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%) !important;
            color: #fff !important;
            box-shadow: 0 4px 16px rgba(231,76,60,0.18);
          }
        `}</style>
      </div>
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body d-flex flex-column align-items-center justify-content-center p-0">
                <Image
                  src={modalImage}
                  alt="Ảnh phóng to"
                  width={600}
                  height={450}
                  style={{ objectFit: "contain", borderRadius: 16, background: "#fff", boxShadow: "0 8px 32px rgba(44,62,80,0.13)" }}
                />
                <Button className="btn btn-secondary mt-3 rounded-pill px-4" onClick={handleCloseModal} style={{ fontSize: 16 }}>
                  <IoMdCloseCircle width={30} height={30} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;