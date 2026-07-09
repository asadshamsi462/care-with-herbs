import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}

        <div>

          <span className="text-[#C8A24C] font-semibold uppercase tracking-widest">
            About Care With Herbs
          </span>

          <h2 className="text-5xl font-bold text-[#1B5E20] mt-4 leading-tight">
            Pure Ayurvedic Wellness
            <br />
            From Nature
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            Care With Herbs is committed to providing premium quality
            Ayurvedic and herbal products prepared from carefully selected
            natural ingredients. Every product is processed with care to
            preserve its purity and effectiveness.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">

            <div className="bg-[#f8f6ef] p-5 rounded-2xl">
              <h3 className="text-2xl">🌿</h3>
              <h4 className="font-bold text-[#1B5E20] mt-3">
                100% Natural
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                Pure herbal ingredients with no harmful chemicals.
              </p>
            </div>

            <div className="bg-[#f8f6ef] p-5 rounded-2xl">
              <h3 className="text-2xl">🧪</h3>
              <h4 className="font-bold text-[#1B5E20] mt-3">
                Chemical Free
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                Safe, clean and traditionally prepared herbal products.
              </p>
            </div>

            <div className="bg-[#f8f6ef] p-5 rounded-2xl">
              <h3 className="text-2xl">🇮🇳</h3>
              <h4 className="font-bold text-[#1B5E20] mt-3">
                Made in India
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                Proudly manufactured using authentic Ayurvedic knowledge.
              </p>
            </div>

            <div className="bg-[#f8f6ef] p-5 rounded-2xl">
              <h3 className="text-2xl">📦</h3>
              <h4 className="font-bold text-[#1B5E20] mt-3">
                Fresh Packing
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                Every order is freshly packed before dispatch.
              </p>
            </div>

          </div>

        </div>

        {/* Right Image */}

        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl">

          <Image
            src="/products/amla.png"
            alt="Care With Herbs"
            fill
            className="object-contain p-10 bg-[#f8f6ef]"
          />

        </div>

      </div>
    </section>
  );
}