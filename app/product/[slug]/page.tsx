import type { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/app/components/ProductCard";
import { notFound } from "next/navigation";
import products from "@/app/data/products";
import ProductPurchase from "@/app/components/ProductPurchase";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BASE_URL = "https://carewithherbs.in";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  const productUrl = `${BASE_URL}/product/${product.slug}`;

  return {
    title: `${product.name} | CARE WITH HERBS™`,
    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      url: productUrl,
      title: `${product.name} | CARE WITH HERBS™`,
      description: product.description,
      siteName: "CARE WITH HERBS™",
      locale: "en_IN",
      images: [
        {
          url: `${BASE_URL}${product.image}`,
          alt: `${product.name} - CARE WITH HERBS™`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | CARE WITH HERBS™`,
      description: product.description,
      images: [`${BASE_URL}${product.image}`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  // Fetch actual available sizes and prices from Supabase
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
      weight: String(size.weight),
      mrp: Number(size.mrp),
      price: Number(size.price),
    })) || [];

  const productUrl = `${BASE_URL}/product/${product.slug}`;
  const productImage = `${BASE_URL}${product.image}`;

  /*
   * Product structured data
   *
   * Prices come from Supabase because that is the actual
   * size/price data used by the product page.
   */
  const offers = productSizes
    .filter(
      (size) =>
        Number.isFinite(size.price) &&
        size.price > 0 &&
        size.weight
    )
    .map((size) => ({
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: size.price.toFixed(2),
      availability:
        product.stock === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "CARE WITH HERBS",
        url: BASE_URL,
      },
      name: `${product.name} - ${size.weight}`,
    }));

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [productImage],
    url: productUrl,

    brand: {
      "@type": "Brand",
      name: "CARE WITH HERBS",
    },

    category: product.category,

    sku: `CWH-${product.id}`,

    ...(offers.length > 0
      ? {
          offers:
            offers.length === 1
              ? offers[0]
              : offers,
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/#products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Product + Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Product Image */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] bg-[#f8f6ef] rounded-2xl">
          <Image
            src={product.image}
            alt={`${product.name} - CARE WITH HERBS`}
            fill
            className="object-contain p-6"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8">
          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B5E20] leading-tight">
            {product.name}
          </h1>

          {/* Stock */}
          <div className="mt-3">
            <span className="text-green-600 font-semibold">
              ✅ {product.stock}
            </span>
          </div>

          {/* Reviews */}
          <div className="mt-5 flex items-center gap-2 text-yellow-500 text-lg">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-700 text-base">
              4.9 (128 Reviews)
            </span>
          </div>

          {/* Trust Features */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🌿
              <p className="text-sm font-semibold mt-1">
                100% Natural
              </p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🚚
              <p className="text-sm font-semibold mt-1">
                Free Delivery
              </p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🔒
              <p className="text-sm font-semibold mt-1">
                Secure Payment
              </p>
            </div>

            <div className="bg-[#f8f6ef] rounded-xl p-3 text-center">
              🇮🇳
              <p className="text-sm font-semibold mt-1">
                Made in India
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-600">
            {product.description}
          </p>

          {/* SIZE + PRICE + CART + WHATSAPP */}
          <ProductPurchase
            product={product}
            sizes={productSizes}
            whatsappNumber="918533004409"
          />

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-[#1B5E20]">
              Ingredients
            </h3>

            <p className="mt-2 text-gray-700">
              {product.ingredients}
            </p>
          </div>

          {/* Benefits */}
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

          {/* How To Use */}
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

      {/* Related Products */}
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
    </main>
  );
}