import Image from "next/image";
import Link from "next/link";

export default function EmptyCartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2
        className="text-2xl mb-6"
        style={{ fontFamily: "Lato", fontSize: "24px", fontWeight: "bold" }}
      >
        Giỏ hàng <span className="text-gray-500">(0 Sản phẩm)</span>
      </h2>

      <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <div className="mb-6">
          <Image
            src="/images/ico_emptycart.svg"
            alt="icon giỏ hàng"
            width={120}
            height={120}
          />
        </div>

        <h3
          className="text-center text-gray-700 mb-4"
          style={{ fontFamily: "Lato", fontSize: "18px", fontWeight: 400 }}
        >
          Chưa có sản phẩm trong giỏ hàng của bạn.
        </h3>

        <Link href={'/products'}
          className="bg-red-600 hover:bg-red-700 transition-colors text-white text-lg px-8 py-3 rounded-lg shadow-md"
          style={{ fontFamily: "Lato", fontWeight: "bold", border: "none", borderRadius: "10px", textDecoration: "none"}}
        >
          MUA SẮM NGAY
        </Link>
      </div>
    </div>
  );
}
