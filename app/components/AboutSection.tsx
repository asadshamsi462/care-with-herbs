import Image from "next/image";

const features = [
  {
    icon: "🌿",
    title: "Carefully Selected Herbs",
    description:
      "We focus on thoughtfully selected herbal ingredients and products with attention to quality and consistency.",
  },
  {
    icon: "🏆",
    title: "Quality Focused",
    description:
      "Quality and consistency are important parts of our approach, from product selection to customer delivery.",
  },
  {
    icon: "🔍",
    title: "Thoughtful Sourcing",
    description:
      "We work with responsible sourcing and manufacturing partners to bring herbal wellness products to our customers.",
  },
  {
    icon: "🇮🇳",
    title: "Made in India",
    description:
      "CARE WITH HERBS is an Indian herbal wellness brand based in Nagina, Bijnor, Uttar Pradesh.",
  },
  {
    icon: "📦",
    title: "Careful Packaging",
    description:
      "Our products are packed with attention to presentation, product information and customer experience.",
  },
  {
    icon: "❤️",
    title: "Customer First",
    description:
      "We believe in honest communication, dependable service and building long-term customer trust.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-[#f9faf6] via-white to-[#f5f8f1]"
    >
      {/* Decorative Background */}

      <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full bg-[#C8A24C]/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#1B5E20]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* =====================================================
            BRAND STORY
        ===================================================== */}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* LEFT */}

          <div>

            <span className="uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#C8A24C] font-semibold text-sm">
              About CARE WITH HERBS™
            </span>

            <h2 className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-[#1B5E20]">

              Rooted in Nature.

              <br />

              Built on Trust.

            </h2>

            <div className="w-24 sm:w-28 h-1 bg-[#C8A24C] rounded-full mt-6 sm:mt-8" />

            <p className="mt-7 sm:mt-9 text-base sm:text-lg leading-7 sm:leading-9 text-gray-600">

              <strong className="text-[#1B5E20]">
                CARE WITH HERBS™
              </strong>{" "}
              is a herbal wellness brand based in{" "}
              <strong>Nagina, Bijnor, Uttar Pradesh</strong>.

              We are committed to bringing carefully selected herbal
              products to our customers with a focus on quality,
              responsible sourcing, clear product information and
              dependable customer service.

            </p>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7 sm:leading-9 text-gray-600">

              Our goal is simple — to make herbal wellness products
              accessible while building a brand that customers can
              rely on for consistency, transparency and care.

            </p>

            {/* LOCATION / BRAND IDENTITY */}

            <div className="mt-7 sm:mt-9 inline-flex items-center gap-3 rounded-2xl bg-[#1B5E20]/5 border border-[#1B5E20]/10 px-4 sm:px-5 py-3">

              <span className="text-xl">
                📍
              </span>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Based in
                </p>

                <p className="font-semibold text-[#1B5E20]">
                  Nagina, Bijnor, Uttar Pradesh
                </p>
              </div>

            </div>

            {/* MISSION / VISION */}

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 mt-9 sm:mt-12">

              {/* Mission */}

              <div className="rounded-[24px] sm:rounded-[28px] bg-[#1B5E20] p-6 sm:p-8 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-[#2E7D32]">

                <div className="text-3xl sm:text-4xl">
                  🌿
                </div>

                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold">
                  Our Mission
                </h3>

                <p className="mt-3 sm:mt-5 leading-7 sm:leading-8 text-green-100">
                  To offer thoughtfully selected herbal wellness
                  products with a focus on quality, responsible
                  sourcing and customer trust.
                </p>

              </div>

              {/* Vision */}

              <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#C8A24C] to-[#B88D2B] p-6 sm:p-8 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

                <div className="text-3xl sm:text-4xl">
                  ✨
                </div>

                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold">
                  Our Vision
                </h3>

                <p className="mt-3 sm:mt-5 leading-7 sm:leading-8">
                  To build CARE WITH HERBS™ into a trusted herbal
                  wellness brand known for quality, consistency and
                  customer care.
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}

          <div className="relative max-w-xl mx-auto w-full">

            <div className="absolute -inset-4 sm:-inset-6 rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#C8A24C]/20 via-transparent to-[#1B5E20]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#D7C78F] bg-gradient-to-br from-[#FCFBF6] to-[#EEF6EA] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

              <Image
                src="/images/about-herbal-premium.png"
                alt="CARE WITH HERBS premium herbal wellness products"
                width={900}
                height={1000}
                priority
                className="w-full h-auto object-cover hover:scale-105 transition-all duration-700"
              />

            </div>

          </div>

        </div>

        {/* =====================================================
            WHY CHOOSE US
        ===================================================== */}

        <div className="mt-20 sm:mt-24 lg:mt-28 text-center">

          <span className="uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#C8A24C] font-semibold text-sm">
            Why Choose CARE WITH HERBS™
          </span>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B5E20]">
            Herbal Wellness, With Care
          </h2>

          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-7 sm:leading-8 text-gray-600">
            We focus on thoughtful product selection, quality,
            responsible sourcing and a customer experience built
            around trust.
          </p>

        </div>

        {/* =====================================================
            FEATURE CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">

          {features.map((item) => (

            <div
              key={item.title}
              className="group rounded-[24px] sm:rounded-[28px] bg-white border border-[#ECE5D2] p-6 sm:p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >

              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#1B5E20]/10 to-[#C8A24C]/20 text-3xl sm:text-4xl group-hover:scale-110 transition">

                {item.icon}

              </div>

              <h3 className="mt-5 sm:mt-7 text-xl sm:text-2xl font-bold text-[#1B5E20]">
                {item.title}
              </h3>

              <div className="w-10 sm:w-12 h-1 rounded-full bg-[#C8A24C] mt-3 sm:mt-4" />

              <p className="mt-4 sm:mt-6 leading-7 sm:leading-8 text-gray-600">
                {item.description}
              </p>

            </div>

          ))}

        </div>

        {/* =====================================================
            BRAND PROMISE
        ===================================================== */}

        <div className="mt-20 sm:mt-24 lg:mt-28">

          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#1B5E20] via-[#256B2D] to-[#1B5E20] px-6 py-10 sm:p-12 lg:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.20)]">

            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#C8A24C]/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">

              <span className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#F4DE95] font-semibold text-sm">
                Our Promise
              </span>

              <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                Quality You Can Trust.
                <br />
                Care You Can Feel.
              </h2>

              <p className="mt-6 sm:mt-8 max-w-3xl mx-auto text-base sm:text-lg leading-7 sm:leading-9 text-green-100">

                Every product offered by{" "}
                <strong>CARE WITH HERBS™</strong>{" "}
                represents our commitment to thoughtful selection,
                quality-focused sourcing and dependable customer
                service.

              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            TRUST HIGHLIGHTS
        ===================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-14 lg:mt-16">

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECE5D2] p-5 sm:p-7 shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">

            <div className="text-3xl sm:text-4xl">
              🌿
            </div>

            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#1B5E20]">
              Herbal Focus
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Carefully Selected Products
            </p>

          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECE5D2] p-5 sm:p-7 shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">

            <div className="text-3xl sm:text-4xl">
              🏆
            </div>

            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#1B5E20]">
              Quality Focus
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Consistency Matters
            </p>

          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECE5D2] p-5 sm:p-7 shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">

            <div className="text-3xl sm:text-4xl">
              🇮🇳
            </div>

            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#1B5E20]">
              Made in India
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Nagina, Bijnor
            </p>

          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECE5D2] p-5 sm:p-7 shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">

            <div className="text-3xl sm:text-4xl">
              ❤️
            </div>

            <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-[#1B5E20]">
              Customer Trust
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Your Experience Matters
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}