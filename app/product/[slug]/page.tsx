import AddToCartButton from "../../components/AddToCartButton";
import Image from "next/image";
import ProductCard from "@/app/components/ProductCard";
import { notFound } from "next/navigation";
import products from "@/app/data/products";
import { FlowerIcon } from "lucide-react";
import ProductPurchase from "@/app/components/ProductPurchase";
import { supabase } from "@/lib/supabase";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }
const { data: sizeData, error: sizesError } = await supabase
  .from("product_sizes")
  .select("weight, mrp, price")
  .eq("product_id", product.id)
  .order("id", { ascending: true });

if (sizesError) {
  console.error("Product sizes error:", sizesError);
}

const productSizes =
  sizeData?.map((size) => ({
    weight: size.weight,
    mrp: Number(size.mrp),
    price: Number(size.price),
  })) || [];

  const whatsappMessage = `🌿 Hello Care With Herbs,

I'd like to place an order from your website.

🛍️ Product: ${product.name}
📦 Weight: ${product.weight}

Please confirm the price and payment details.

Thank you for choosing Care With Herbs. 🌿`;

  const whatsappLink = `https://wa.me/918533004409?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Product Image */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] bg-[#f8f6ef] rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B5E20] leading-tight">
            {product.name}
          </h1>


          <div className="mt-3">
            <span className="text-green-600 font-semibold">
              ✅ {product.stock}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-yellow-500 text-lg">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-700 text-base">
              4.9 (128 Reviews)
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🌿
              <p className="text-sm font-semibold mt-1">100% Natural</p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🚚
              <p className="text-sm font-semibold mt-1">Free Delivery</p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🔒
              <p className="text-sm font-semibold mt-1">Secure Payment</p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🇮🇳
              <p className="text-sm font-semibold mt-1">Made in India</p>
            </div>

          </div>

          <p className="mt-6 text-lg text-gray-600">
            {product.description}
          </p>

          <ProductPurchase
  product={product}
  sizes={productSizes}
  whatsappNumber="918533004409"
/>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1B5E20]">
              Ingredients
            </h3>

            <p className="mt-2 text-gray-700">
              {product.ingredients}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1B5E20]">
              Benefits
            </h3>

            <ul className="mt-3 space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="text-gray-700">
                  ✅ {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1B5E20]">
              How to Use
            </h3>

            <p className="mt-2 text-gray-700">
              {product.usage}
            </p>
          </div>

        

        </div>
      </div>

      <hr className="my-20" />

      <section>
        <h2 className="text-4xl font-bold text-[#1B5E20] mb-10">
          Related Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>

      {/* Sticky Mobile Order Button */}
      <div className="fixed bottom-5 left-0 right-0 px-5 z-50 md:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl shadow-2xl font-bold text-lg"
        >
          📱 Order on WhatsApp
        </a>
      </div>

    </main>
  );
}