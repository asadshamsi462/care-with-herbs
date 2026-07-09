const products = [
  {
    id: 1,
    slug: "amla-powder",
    name: "Amla Powder",
    image: "/products/amla.png",
    category: "Immunity",
    price: 249,
    mrp: 399,
    discount: "38% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium quality Amla Powder made from carefully selected Indian Gooseberries.",

    ingredients:
      "100% Pure Amla Powder",

    usage:
      "Take 1 teaspoon daily with lukewarm water or as directed by your physician.",

    benefits: [
      "Boosts Immunity",
      "Rich in Vitamin C",
      "Supports Hair Growth",
      "Improves Digestion",
      "Promotes Healthy Skin",
    ],
  },

  {
    id: 2,
    slug: "amla-reetha-shikakai-mix",
    name: "Amla Reetha Shikakai Mix",
    image: "/products/amla.retha.shikakayi.mix.png",
    category: "Hair Care",
    price: 299,
    mrp: 449,
    discount: "33% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: false,
    weight: "100 GM",

    description:
      "Traditional Ayurvedic hair care blend of Amla, Reetha and Shikakai.",

    ingredients:
      "Amla, Reetha, Shikakai",

    usage:
      "Mix with water to prepare hair mask and apply for 20-30 minutes before washing.",

    benefits: [
      "Strengthens Hair",
      "Reduces Hair Fall",
      "Natural Hair Cleanser",
      "Promotes Hair Growth",
      "Adds Shine",
    ],
  },

  {
    id: 3,
    slug: "arjuna-chal-powder",
    name: "Arjuna Chal Powder",
    image: "/products/arjuna.chal.png",
    category: "Heart Care",
    price: 269,
    mrp: 399,
    discount: "32% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium Arjuna Chal Powder prepared from quality bark.",

    ingredients:
      "100% Pure Arjuna Chal",

    usage:
      "Use as directed by your healthcare professional.",

    benefits: [
      "Supports Heart Health",
      "Rich in Antioxidants",
      "Supports Blood Circulation",
      "Natural Herbal Supplement",
    ],
  },

  {
    id: 4,
    slug: "gurehal-powder",
    name: "Gurehal Powder",
    image: "/products/gurehal.png",
    category: "General Wellness",
    price: 239,
    mrp: 349,
    discount: "31% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium quality Gurehal Powder.",

    ingredients:
      "100% Pure Gurehal",

    usage:
      "Use according to expert advice.",

    benefits: [
      "Supports General Wellness",
      "Natural Herbal Product",
      "Freshly Packed",
    ],
  },
    {
    id: 5,
    slug: "jamun-powder",
    name: "Jamun Powder",
    image: "/products/jamun.png",
    category: "Diabetes Care",
    price: 249,
    mrp: 349,
    discount: "29% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: false,
    weight: "100 GM",

    description:
      "Premium Jamun Powder made from carefully selected Jamun fruits.",

    ingredients:
      "100% Pure Jamun Powder",

    usage:
      "Take 1 teaspoon daily with water or as directed.",

    benefits: [
      "Supports Healthy Blood Sugar",
      "Rich in Antioxidants",
      "Supports Digestion",
      "Natural Herbal Product",
    ],
  },

  {
    id: 6,
    slug: "karela-powder",
    name: "Karela Powder",
    image: "/products/karela.powder.png",
    category: "Diabetes Care",
    price: 259,
    mrp: 399,
    discount: "35% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium quality Karela Powder prepared from fresh bitter gourd.",

    ingredients:
      "100% Pure Karela Powder",

    usage:
      "Take 1 teaspoon daily with lukewarm water.",

    benefits: [
      "Supports Healthy Blood Sugar",
      "Supports Digestion",
      "Rich in Nutrients",
      "Natural Detox",
    ],
  },

  {
    id: 7,
    slug: "konch-powder",
    name: "Konch Powder",
    image: "/products/konch.powder.png",
    category: "Men's Health",
    price: 349,
    mrp: 499,
    discount: "30% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium Konch Powder made from carefully processed seeds.",

    ingredients:
      "100% Pure Konch Powder",

    usage:
      "Use as directed by your healthcare professional.",

    benefits: [
      "Supports Strength",
      "Supports Energy",
      "Natural Herbal Supplement",
      "Premium Quality",
    ],
  },

  {
    id: 8,
    slug: "neem-powder",
    name: "Neem Powder",
    image: "/products/neem.powder.png",
    category: "Skin Care",
    price: 229,
    mrp: 349,
    discount: "34% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,

    weight: "100 GM",

    description:
      "Premium Neem Powder made from fresh neem leaves.",

    ingredients:
      "100% Pure Neem Powder",

    usage:
      "Use according to expert advice.",

    benefits: [
      "Supports Healthy Skin",
      "Supports Blood Purification",
      "Supports Immunity",
      "Natural Herbal Care",
    ],
  },
    {
    id: 9,
    slug: "safed-musli-powder",
    name: "Safed Musli Powder",
    image: "/products/safed.musli.png",
    category: "Men's Health",
    price: 499,
    mrp: 699,
    discount: "29% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium Safed Musli Powder made from carefully selected roots.",

    ingredients:
      "100% Pure Safed Musli",

    usage:
      "Take 1 teaspoon daily with milk or as directed by your physician.",

    benefits: [
      "Supports Strength",
      "Supports Stamina",
      "Supports Energy",
      "Natural Herbal Supplement",
    ],
  },

  {
    id: 10,
    slug: "satawari-powder",
    name: "Satawari Powder",
    image: "/products/satawari.powder.png",
    category: "Women's Health",
    price: 299,
    mrp: 449,
    discount: "33% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100 GM",

    description:
      "Premium Satawari Powder prepared from high quality roots.",

    ingredients:
      "100% Pure Satawari",

    usage:
      "Take 1 teaspoon daily with milk or lukewarm water.",

    benefits: [
      "Supports Women's Health",
      "Supports Immunity",
      "Supports Digestion",
      "Natural Herbal Supplement",
    ],
  },

  {
    id: 11,
    slug: "triphala-powder",
    name: "Triphala Powder",
    image: "/products/triphala.powder.png",
    category: "Digestive Care",
    price: 249,
    mrp: 399,
    discount: "38% OFF",
    stock: "In Stock",
    badge: "Best Seller",
    isNew: true,
    weight: "100/50 GM",

    description:
      "Traditional Triphala Powder prepared using Amla, Harad and Baheda.",

    ingredients:
      "Amla, Harad, Baheda",

    usage:
      "Take 1 teaspoon at bedtime with lukewarm water.",

    benefits: [
      "Supports Digestion",
      "Natural Detox",
      "Supports Gut Health",
      "Rich in Antioxidants",
    ],
  },
  {
  id: 12,
  slug: "ashwagandha-powder",
  name: "Ashwagandha Powder",
  image: "/products/ashwagandha.powder.png", //
  category: "Wellness",
  price: 269,
  mrp: 399,
  discount: "33% OFF",
  stock: "In Stock",
  badge: "Best Seller",
  isNew: true,
  weight: "100 GM",

  description:
    "Premium quality Ashwagandha Powder made from carefully selected Ashwagandha roots.",

  ingredients:
    "100% Pure Ashwagandha Powder",

  usage:
    "Take 1 teaspoon daily with lukewarm milk or water, or as directed by your physician.",

  benefits: [
    "Supports Stress Management",
    "Boosts Energy",
    "Improves Stamina",
    "Supports Better Sleep",
    "Promotes Overall Wellness",
  ],
},
];

export default products;