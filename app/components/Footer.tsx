import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#1B5E20] text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold">
            CARE WITH HERBS
          </h2>

          <p className="mt-4 text-green-100 leading-7">
            Premium Ayurvedic & Herbal Products for a Healthy Lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-[#C8A24C] transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/#products" className="hover:text-[#C8A24C] transition">
                Products
              </Link>
            </li>

            <li>
              <Link href="/#about" className="hover:text-[#C8A24C] transition">
                About
              </Link>
            </li>

            <li>
              <Link href="/#contact" className="hover:text-[#C8A24C] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <p>📞 +91 8533004409</p>

          <p className="mt-3 break-all">
            📧 asadshamsi462@gmail.com
          </p>

          <p className="mt-3 leading-7">
            📍 Nagina, District Bijnor,
            <br />
            Uttar Pradesh, India
          </p>
        </div>

        {/* WhatsApp */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Order Now
          </h3>

          <a
            href="https://wa.me/918533004409"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
          >
            📱 WhatsApp
          </a>
        </div>

      </div>

      <div className="border-t border-green-700 py-6 text-center text-green-100">
        © {new Date().getFullYear()} Care With Herbs. All Rights Reserved.
      </div>
    </footer>
  );
}