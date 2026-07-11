import Image from "next/image";

const features = [
  {
    icon: "🌿",
    title: "100% Natural Herbs",
    description:
      "Prepared from carefully selected premium herbs to preserve maximum purity and natural goodness.",
  },
  {
    icon: "🏆",
    title: "Premium Quality",
    description:
      "Every batch is prepared with strict quality standards for freshness and consistency.",
  },
  {
    icon: "🧪",
    title: "Chemical Free",
    description:
      "No harmful chemicals, artificial colours or unnecessary fillers.",
  },
  {
    icon: "🇮🇳",
    title: "Made In India",
    description:
      "Inspired by authentic Ayurvedic traditions and proudly crafted in India.",
  },
  {
    icon: "📦",
    title: "Fresh Packing",
    description:
      "Freshly packed to maintain aroma, nutrition and natural effectiveness.",
  },
  {
    icon: "❤️",
    title: "Customer First",
    description:
      "Every product is made with honesty, care and your family's wellness in mind.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 bg-gradient-to-b from-[#f9faf6] via-white to-[#f5f8f1]"
    >
      {/* Decorative Background */}

      <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-[#C8A24C]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#1B5E20]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div>

            <span className="uppercase tracking-[0.4em] text-[#C8A24C] font-semibold">
              About Care With Herbs
            </span>

            <h2 className="mt-6 text-5xl lg:text-6xl font-black leading-[1.1] text-[#1B5E20]">

              Nature's Purity

              <br />

              Crafted For

              <br />

              Your Wellness

            </h2>

            <div className="w-28 h-1 bg-[#C8A24C] rounded-full mt-8"></div>

            <p className="mt-10 text-lg leading-9 text-gray-600">

              <strong>CARE WITH HERBS</strong> believes true wellness begins
              with nature.

              We carefully select premium herbs and prepare every product
              with authenticity, purity and traditional Ayurvedic wisdom.

              Our mission is simple—

              to bring trusted herbal wellness into every home while
              preserving nature's goodness.

            </p>

            <div className="grid sm:grid-cols-2 gap-7 mt-14">

              {/* Mission */}

              <div className="rounded-[28px] bg-[#1B5E20] p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-[#2E7D32]">

                <div className="text-4xl">🌿</div>

                <h3 className="mt-5 text-2xl font-bold">

                  Our Mission

                </h3>

                <p className="mt-5 leading-8 text-green-100">

                  Deliver premium herbal wellness products made with
                  honesty, purity and traditional Ayurvedic values.

                </p>

              </div>

              {/* Vision */}

              <div className="rounded-[28px] bg-gradient-to-br from-[#C8A24C] to-[#B88D2B] p-8 text-white shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

                <div className="text-4xl">👑</div>

                <h3 className="mt-5 text-2xl font-bold">

                  Our Vision

                </h3>

                <p className="mt-5 leading-8">

                  Become India's trusted premium herbal wellness brand,
                  known for purity, quality and customer trust.

                </p>

              </div>

            </div>

          </div>
                    {/* RIGHT IMAGE */}

          <div className="relative">

            {/* Golden Glow */}

            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-[#C8A24C]/20 via-transparent to-[#1B5E20]/20 blur-2xl"></div>

            <div className="relative overflow-hidden rounded-[36px] border border-[#D7C78F] bg-gradient-to-br from-[#FCFBF6] to-[#EEF6EA] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

              <Image
                src="/images/about-herbal-premium.png"
                alt="Care With Herbs Premium Herbal Wellness"
                width={900}
                height={1000}
                priority
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
              />

            </div>

          </div>

        </div>

        {/* WHY CHOOSE US */}

        <div className="mt-28 text-center">

          <span className="uppercase tracking-[0.35em] text-[#C8A24C] font-semibold">

            Why Choose Care With Herbs

          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-[#1B5E20]">

            Premium Herbal Wellness

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-9 text-gray-600">

            Every product is thoughtfully prepared using carefully selected herbs,
            traditional Ayurvedic knowledge and uncompromising quality standards.

          </p>

        </div>

        {/* FEATURE CARDS */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

          {features.map((item) => (

            <div
              key={item.title}
              className="group rounded-[28px] bg-white border border-[#ECE5D2] p-8 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              <div className="w-18 h-18 flex items-center justify-center rounded-full bg-gradient-to-br from-[#1B5E20]/10 to-[#C8A24C]/20 text-4xl group-hover:scale-110 transition">

                {item.icon}

              </div>

              <h3 className="mt-7 text-2xl font-bold text-[#1B5E20]">

                {item.title}

              </h3>

              <div className="w-12 h-1 rounded-full bg-[#C8A24C] mt-4"></div>

              <p className="mt-6 leading-8 text-gray-600">

                {item.description}

              </p>

            </div>

          ))}

        </div>
                {/* PREMIUM PROMISE */}

        <div className="mt-28">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#1B5E20] via-[#256B2D] to-[#1B5E20] p-12 lg:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.20)]">

            {/* Decorative Glow */}

            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#C8A24C]/20 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative">

              <span className="uppercase tracking-[0.35em] text-[#F4DE95] font-semibold">
                Our Promise
              </span>

              <h2 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-white">
                Nature Has The Power To Heal.
                <br />
                We Simply Preserve Its Purity.
              </h2>

              <p className="mt-8 max-w-3xl mx-auto text-lg leading-9 text-green-100">

                Every product from <strong>CARE WITH HERBS</strong> is
                carefully prepared using premium herbs and traditional
                Ayurvedic knowledge. Our commitment is to deliver purity,
                quality and trust in every pack.

              </p>

            </div>

          </div>

        </div>

        {/* TRUST HIGHLIGHTS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          <div className="rounded-3xl bg-white border border-[#ECE5D2] p-7 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center">

            <div className="text-4xl">🌿</div>

            <h3 className="mt-4 text-xl font-bold text-[#1B5E20]">
              100% Natural
            </h3>

            <p className="mt-2 text-gray-600">
              Carefully Selected Herbs
            </p>

          </div>

          <div className="rounded-3xl bg-white border border-[#ECE5D2] p-7 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center">

            <div className="text-4xl">🏆</div>

            <h3 className="mt-4 text-xl font-bold text-[#1B5E20]">
              Premium Quality
            </h3>

            <p className="mt-2 text-gray-600">
              Strict Quality Standards
            </p>

          </div>

          <div className="rounded-3xl bg-white border border-[#ECE5D2] p-7 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center">

            <div className="text-4xl">🇮🇳</div>

            <h3 className="mt-4 text-xl font-bold text-[#1B5E20]">
              Made In India
            </h3>

            <p className="mt-2 text-gray-600">
              Inspired By Ayurveda
            </p>

          </div>

          <div className="rounded-3xl bg-white border border-[#ECE5D2] p-7 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center">

            <div className="text-4xl">❤️</div>

            <h3 className="mt-4 text-xl font-bold text-[#1B5E20]">
              Customer Trust
            </h3>

            <p className="mt-2 text-gray-600">
              Your Wellness First
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}