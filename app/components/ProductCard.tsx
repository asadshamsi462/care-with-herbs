import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price?: number;
  mrp?: number;
  discount?: string;
  badge?: string;
  isNew?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-[28px] overflow-hidden border border-[#e8e8e8] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

      {/* Product Image */}
      <div className="relative h-72 bg-gradient-to-br from-[#f8f6ef] to-[#eef8ef] overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full bg-green-100 blur-3xl opacity-60"></div>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">

          {product.badge && (
            <span className="bg-[#1B5E20] text-white text-xs font-semibold px-3 py-1 rounded-full">
              🌿 {product.badge}
            </span>
          )}

          {product.isNew && (
            <span className="bg-[#C8A24C] text-white text-xs font-semibold px-3 py-1 rounded-full">
              ✨ New
            </span>
          )}

        </div>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 group-hover:scale-105 transition-all duration-500 drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Product Details */}
      <div className="p-6">

        <h3 className="text-2xl font-bold text-[#1B5E20] leading-8 min-h-[64px]">
          {product.name}
        </h3>

        {/* Price */}

        {product.price && (

          <div className="flex items-center gap-2 mt-5 flex-wrap">

            <span className="text-3xl font-bold text-[#1B5E20]">
              ₹{product.price}
            </span>

            {product.mrp && (
              <span className="text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}

            {product.discount && (
              <span className="bg-[#EAF8EC] text-[#1B5E20] text-xs font-semibold px-3 py-1 rounded-full">
                Save {product.discount.replace(" OFF", "")}
              </span>
            )}

          </div>

        )}

        {/* Features */}

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            🌿 Natural
          </span>

          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
            ⭐ Premium
          </span>

        </div>

        {/* Button */}

        <Link
          href={`/product/${product.slug}`}
          className="mt-7 block w-full bg-[#C8A24C] hover:bg-[#b38d2c] text-white text-center font-semibold py-4 rounded-2xl transition duration-300"
        >
          View Product →
        </Link>

      </div>

    </div>
  );
}