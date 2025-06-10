import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SingleProductCard({ product }: { product: any }) {
  const addCart = () => {
     toast.success("Đã thêm vào giỏ hàng!");
  }
  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 product-card position-relative bg-white">
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
            width={500}
            height={220}
            style={{
              height: "220px",
              objectFit: "cover",
              borderTopLeftRadius: "1.2rem",
              borderTopRightRadius: "1.2rem",
              transition: "transform 0.3s",
            }}
          />
        </Link>
      </div>
      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <h6 className="card-title text-truncate mb-2" title={product.productName} style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>
          {product.productName}
        </h6>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="text-danger fw-bold" style={{ fontSize: 20 }}>
            {product.productPrice.toLocaleString('de-DE')}đ
          </span>
          {product.productPriceOld && (
            <small className="text-muted text-decoration-line-through" style={{ fontSize: 15 }}>
              {product.productPriceOld.toLocaleString('de-DE')}đ
            </small>
          )}
          
        </div>
       <button className="w-full flex items-center justify-center gap-2 rounded-md bg-red-500 text-white px-4 py-2 font-bold text-lg hover:bg-red-600 transition-all" 
       style={{ fontFamily: "Lato" , border: "none", borderRadius: "10px"}}
        onClick={() => addCart()}>
        <FaShoppingCart />Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
} 