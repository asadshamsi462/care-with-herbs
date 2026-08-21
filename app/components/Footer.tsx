import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#1B5E20] text-white mt-16 sm:mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* =====================================================
              BRAND
          ===================================================== */}

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
              CARE WITH HERBS™
            </h2>

            <div className="w-12 h-1 bg-[#C8A24C] rounded-full mt-4" />

            <p className="mt-5 text-green-100 leading-7">
              Premium herbal wellness products with a focus on
              thoughtful selection, quality and customer trust.
            </p>

            <p className="mt-4 text-sm text-green-200 leading-6">
              Based in Nagina, Bijnor, Uttar Pradesh, India.
            </p>

          </div>

          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div>

            <h3 className="text-lg sm:text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-green-100">

              <li>
                <Link
                  href="/"
                  className="hover:text-[#C8A24C] transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/#products"
                  className="hover:text-[#C8A24C] transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="hover:text-[#C8A24C] transition"
                >
                  About CARE WITH HERBS
                </Link>
              </li>

              <li>
                <Link
                  href="/#contact"
                  className="hover:text-[#C8A24C] transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <div>

            <h3 className="text-lg sm:text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-green-100">

              <a
                href="tel:+918533004409"
                className="flex items-start gap-3 hover:text-[#C8A24C] transition"
              >
                <span>📞</span>

                <span>
                  +91 8533004409
                </span>
              </a>

              <a
                href="mailto:asadshamsi462@gmail.com"
                className="flex items-start gap-3 break-all hover:text-[#C8A24C] transition"
              >
                <span>📧</span>

                <span>
                  asadshamsi462@gmail.com
                </span>
              </a>

              <div className="flex items-start gap-3">

                <span>📍</span>

                <span className="leading-7">
                  Nagina, District Bijnor,
                  <br />
                  Uttar Pradesh, India
                </span>

              </div>

            </div>

          </div>

          {/* =====================================================
              WHATSAPP / ORDER
          ===================================================== */}

          <div>

            <h3 className="text-lg sm:text-xl font-semibold mb-5">
              Order Now
            </h3>

            <p className="text-green-100 leading-7 mb-5">
              Need help with your order or product selection?
              Contact CARE WITH HERBS directly.
            </p>

            <a
              href="https://wa.me/918533004409"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact CARE WITH HERBS on WhatsApp"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-5 sm:px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
            >
              📱 WhatsApp Us
            </a>

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================= */}

      <div className="border-t border-green-700">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">

            <p className="text-sm text-green-100">
              © {new Date().getFullYear()} CARE WITH HERBS™.
              All Rights Reserved.
            </p>

            <p className="text-xs sm:text-sm text-green-200">
              Herbal Wellness • Quality • Trust
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}