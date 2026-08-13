"use client";
import { useState, useEffect, ChangeEvent } from "react";
import ImageUploader from "./ImageUploader";

export type NewProduct = {
  image: File | null;
  name: string;
  slug: string;
  category: string;
  weight: string;
  price: string;
  mrp: string;
   sizes: {
    weight: string;
    mrp: string;
    price: string;
  }[];
  stock: string;
  badge: string;
  isNew: boolean;
  description: string;
  ingredients: string;
  usage: string;
  benefits: string[];
};

type AddProductModalProps = {
  title?: string;
  saveButtonText?: string;

  open: boolean;
  onClose: () => void;
 onSave: (
  sizes: {
    weight: string;
    mrp: string;
    price: string;
  }[]
) => void;
  newProduct: NewProduct;
  setNewProduct: React.Dispatch<
    React.SetStateAction<NewProduct>
  >;
};

export default function AddProductModal({
  title = "Add New Product",
  saveButtonText = "Save Product",

  open,
  onClose,
  onSave,

  newProduct,
  setNewProduct,
}: AddProductModalProps)
 {
  const [preview, setPreview] = useState<string | null>(null);

  const [discount, setDiscount] = useState("0%");
 const [sizes, setSizes] = useState<
  {
    weight: string;
    mrp: string;
    price: string;
  }[]
>([
  {
    weight: "",
    mrp: "",
    price: "",
  },
]);
useEffect(() => {
  if (open) {
    if (newProduct.sizes && newProduct.sizes.length > 0) {
      setSizes(
        newProduct.sizes.map((size) => ({
          weight: size.weight || "",
          mrp: size.mrp || "",
          price: size.price || "",
        }))
      );
    } else {
      setSizes([
        {
          weight: "",
          mrp: "",
          price: "",
        },
      ]);
    }
  }
}, [open, newProduct.sizes]);

console.log("MODAL SIZES:", sizes);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setPreview(URL.createObjectURL(file));

  setNewProduct({
    ...newProduct,
    image: file,
  });
};
const calculateDiscount = (price: string, mrp: string) => {
  const p = Number(price);
  const m = Number(mrp);

  if (!p || !m || m <= p) {
    setDiscount("0%");
    return;
  }

  const value = Math.round(((m - p) / m) * 100);

  setDiscount(`${value}% OFF`);
};
const addSize = () => {
  setSizes([
    ...sizes,
    {
      weight: "",
      mrp: "",
      price: "",
    },
  ]);
};
const removeImage = () => {
  setPreview(null);

  setNewProduct({
    ...newProduct,
    image: null,
  });
};
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
     <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
  {title}
</h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

      <div className="grid flex-1 overflow-y-auto grid-cols-1 gap-5 p-6 md:grid-cols-2">
         <ImageUploader
          preview={preview}
          onImageChange={handleImageChange}
          onRemove={removeImage}
      />
         <div className="md:col-span-2">
           <h3 className="text-xl font-bold text-[#1B5E20] border-b pb-2">
              Basic Information
          </h3>
       </div>
          <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
    Product Name
  </label>

  <input
    type="text"
    placeholder="Enter Product Name"
    value={newProduct.name}
    onChange={(e) => {
  const name = e.target.value;

  setNewProduct({
    ...newProduct,
    name,
    slug: name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  });
}}
    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
  />
  <p className="mt-2 text-xs text-gray-500">
  URL Slug:
  <span className="ml-2 font-semibold text-[#1B5E20]">
    {newProduct.slug || "product-slug"}
  </span>
</p>
</div>
          <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Category
  </label>

  <select
    value={newProduct.category}
    onChange={(e) =>
      setNewProduct({
        ...newProduct,
        category: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
  >
    <option value="">Select Category</option>
    <option value="Immunity">Immunity</option>
    <option value="Hair Care">Hair Care</option>
    <option value="Digestive">Digestive</option>
    <option value="Diabetes Care">Diabetes Care</option>
    <option value="Women's Health">Women's Health</option>
    <option value="Men's Health">Men's Health</option>
    <option value="General Wellness">General Wellness</option>
  </select>
</div>

<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Weight
  </label>

  <select
  value={newProduct.weight}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      weight: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
>
  <option value="">Select Weight</option>
  <option value="50 GM">50 GM</option>
  <option value="100 GM">100 GM</option>
  <option value="250 GM">250 GM</option>
  <option value="500 GM">500 GM</option>
  <option value="1 KG">1 KG</option>
</select>
</div>

          <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Selling Price (₹)
  </label>

  <input
    type="number"
    placeholder="249"
    value={newProduct.price}
    onChange={(e) => {
  const value = e.target.value;

  setNewProduct({
    ...newProduct,
    price: value,
  });

  setSizes((prev) =>
    prev.map((size) =>
      size.weight === newProduct.weight
        ? {
            ...size,
            price: value,
          }
        : size
    )
  );

  calculateDiscount(value, newProduct.mrp);
}}
    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
  />
</div>

         <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    MRP (₹)
  </label>

  <input
    type="number"
    placeholder="399"
    value={newProduct.mrp}
  onChange={(e) => {
  const value = e.target.value;

  setNewProduct({
    ...newProduct,
    mrp: value,
  });

  setSizes((prev) =>
    prev.map((size) =>
      size.weight === newProduct.weight
        ? {
            ...size,
            mrp: value,
          }
        : size
    )
  );

  calculateDiscount(newProduct.price, value);
}}
    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
  />
  <p className="mt-2 text-sm font-semibold text-green-700">
  Discount: {discount}
</p>
</div>

          <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Stock Status
  </label>

  <select
    value={newProduct.stock}
    onChange={(e) =>
      setNewProduct({
        ...newProduct,
        stock: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
  >
    <option>In Stock</option>
    <option>Out of Stock</option>
  </select>
</div>
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Badge
  </label>

  <select
    value={newProduct.badge}
    onChange={(e) =>
      setNewProduct({
        ...newProduct,
        badge: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-300 p-3"
  >
    <option value="">No Badge</option>
    <option value="Best Seller">Best Seller</option>
    <option value="New Arrival">New Arrival</option>
    <option value="Premium">Premium</option>
    <option value="Trending">Trending</option>
  </select>
</div>
<div className="flex items-center gap-3 pt-8">
  <input
    type="checkbox"
    checked={newProduct.isNew}
    onChange={(e) =>
      setNewProduct({
        ...newProduct,
        isNew: e.target.checked,
      })
    }
    className="h-5 w-5"
  />

  <label className="font-semibold text-gray-700">
    Mark as New Product
  </label>
</div>
        {/* Product Description */}
        <div className="md:col-span-2">
          <h3 className="mb-4 border-b pb-2 text-xl font-bold text-[#1B5E20]">
            Product Details
          </h3>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter product description..."
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Ingredients
          </label>

          <textarea
            rows={3}
            placeholder="100% Pure Herbal Powder"
            value={newProduct.ingredients}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                ingredients: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Usage
          </label>

          <textarea
            rows={3}
            placeholder="Take 1 teaspoon with lukewarm water..."
            value={newProduct.usage}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                usage: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#1B5E20] focus:ring-2 focus:ring-[#1B5E20]/20"
          />
        </div>

        {/* Benefits */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Benefits
          </label>

          {newProduct.benefits.map((benefit, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Benefit ${index + 1}`}
              value={benefit}
              onChange={(e) => {
                const updated = [...newProduct.benefits];
                updated[index] = e.target.value;

                setNewProduct({
                  ...newProduct,
                  benefits: updated,
                });
              }}
              className="mb-3 w-full rounded-xl border border-gray-300 p-3"
            />
          ))}

          <button
            type="button"
            onClick={() =>
              setNewProduct({
                ...newProduct,
                benefits: [...newProduct.benefits, ""],
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            + Add Benefit
          </button>
        </div>

        {/* Sizes */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Product Sizes
          </label>

         {sizes.map((size, index) => (
  <div
    key={index}
    className="mb-3 flex gap-3 items-center"
  >
    {/* Weight */}
    <input
      type="text"
      placeholder="Weight"
      value={size.weight}
      onChange={(e) => {
        const updated = [...sizes];
        updated[index].weight = e.target.value;
        setSizes(updated);
      }}
      className="flex-1 rounded-xl border border-gray-300 p-3"
    />

    {/* MRP */}
    <input
      type="number"
      placeholder="MRP"
      value={size.mrp}
      onChange={(e) => {
        const updated = [...sizes];
        updated[index].mrp = e.target.value;
        setSizes(updated);
      }}
      className="flex-1 rounded-xl border border-gray-300 p-3"
    />

    {/* Selling Price */}
    <input
      type="number"
      placeholder="Selling Price"
      value={size.price}
      onChange={(e) => {
        const updated = [...sizes];
        updated[index].price = e.target.value;
        setSizes(updated);
      }}
      className="flex-1 rounded-xl border border-gray-300 p-3"
    />

    {/* Delete Size */}
    <button
      type="button"
      onClick={() => {
        const updated = sizes.filter((_, i) => i !== index);
        setSizes(updated);
      }}
      className="rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
      title="Delete Size"
    >
      🗑️
    </button>
  </div>
))}

<button
  type="button"
  onClick={addSize}
  className="rounded-lg bg-[#1B5E20] px-4 py-2 text-white"
>
  + Add Size
</button>       
 </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t bg-gray-50 p-6">

        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-6 py-2 font-medium hover:bg-gray-100"
        >
          Cancel
        </button>

       <button
  type="button"
 onClick={() => onSave(sizes)}
  className="rounded-lg bg-[#1B5E20] px-6 py-2 font-semibold text-white hover:bg-[#154a19]"
>
  {saveButtonText}
</button>

      </div>
    </div>
  </div>
);
}