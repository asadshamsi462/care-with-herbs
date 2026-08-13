"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

type Props = {
  preview: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export default function ImageUploader({
  preview,
  onImageChange,
  onRemove,
}: Props) {
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Product Image
      </label>

      <div className="rounded-xl border-2 border-dashed border-gray-300 p-6">
        {preview ? (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={preview}
              alt="Preview"
              width={180}
              height={180}
              className="rounded-xl object-cover"
            />

            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center gap-3">
            <div className="text-5xl">📷</div>

            <p className="font-semibold text-[#1B5E20]">
              Click to upload image
            </p>

            <p className="text-sm text-gray-500">
              PNG, JPG or WEBP
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}