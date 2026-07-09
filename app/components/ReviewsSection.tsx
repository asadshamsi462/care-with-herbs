export default function ReviewsSection() {
  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Delhi",
      rating: "★★★★★",
      review:
        "Excellent quality herbal products. Packaging was premium and delivery was fast.",
    },
    {
      name: "Sana Khan",
      city: "Lucknow",
      rating: "★★★★★",
      review:
        "Amla Powder is very fresh. I can feel the difference after regular use.",
    },
    {
      name: "Amit Verma",
      city: "Jaipur",
      rating: "★★★★★",
      review:
        "Highly recommended. Genuine Ayurvedic products with good customer support.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-[#1B5E20]">
          Customer Reviews
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-14">
          Trusted by customers across India
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8f6ef] rounded-3xl p-8 shadow hover:shadow-xl transition"
            >
              <div className="text-yellow-500 text-xl">
                {item.rating}
              </div>

              <p className="mt-5 text-gray-700 leading-7">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h4 className="font-bold text-[#1B5E20]">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">
                  📍 {item.city}
                </p>

                <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ✔ Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}