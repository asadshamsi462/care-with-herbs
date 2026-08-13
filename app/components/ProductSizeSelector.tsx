"use client";

import { useState } from "react";

type Size = {
  weight: string;
  price: number;
  mrp: number;
};

type Props = {
  sizes: Size[];
  onSelect?: (size: Size) => void;
};

export default function ProductSizeSelector({
  sizes,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number) => {
    setSelected(index);
    onSelect?.(sizes[index]);
  };

  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">
        Available Sizes
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size, index) => (
          <button
            type="button"
            key={size.weight}
            onClick={() => handleSelect(index)}
            className={`rounded-2xl p-5 border-2 transition-all duration-300 text-left ${
              selected === index
                ? "border-[#1B5E20] bg-green-50 shadow-xl scale-105"
                : "border-gray-300 hover:border-[#1B5E20] hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-[#1B5E20]">
                {size.weight}
              </h4>

              {selected === index && (
                <span className="text-green-600 text-xl">
                  ✓
                </span>
              )}
            </div>

            <p className="mt-3 text-3xl font-bold">
              ₹{size.price}
            </p>

            <p className="text-gray-500 line-through">
              ₹{size.mrp}
            </p>

            <p className="text-xs text-green-700 font-semibold mt-2">
              {Math.round(
                ((size.mrp - size.price) / size.mrp) * 100
              )}
              % OFF
            </p>

            {selected === index && (
              <span className="inline-block mt-3 bg-[#1B5E20] text-white text-xs px-3 py-1 rounded-full">
                Selected
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}