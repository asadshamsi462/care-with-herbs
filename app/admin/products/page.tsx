"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import products from "@/app/data/products";
import { supabase } from "@/lib/supabase";
import AddProductModal, {
  type NewProduct,
} from "@/app/components/admin/AddProductModal";
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [productsList, setProductsList] = useState([...products]);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
useEffect(() => {
 const loadProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase products error:", error);
    return;
  }

  if (data) {
    const formattedProducts = data.map((product) => ({
      ...product,
      isNew: product.is_new,
      benefits: product.benefits || [],
    }));

    setProductsList(
      formattedProducts as (typeof productsList)[number][]
        );
    }
  };

  loadProducts();
}, []);
  
const emptyProduct: NewProduct = {
  image: null,
  name: "",
  slug: "",
  category: "",
  weight: "",
  price: "",
  mrp: "",
 sizes: [
  {
    weight: "",
    mrp: "",
    price: "",
  },
],
  stock: "In Stock",
  badge: "",
  isNew: false,
  description: "",
  ingredients: "",
  usage: "",
  benefits: [],
};
const [newProduct, setNewProduct] = useState<NewProduct>({
  image: null,
  name: "",
  slug: "",
  category: "",
  weight: "",
  price: "",
  mrp: "",
 sizes: [
  {
    weight: "",
    mrp: "",
    price: "",
  },
],
  stock: "In Stock",

  badge: "",
  isNew: false,
    description: "",
  ingredients: "",
  usage: "",
  benefits: [],
});
const handleSaveProduct = async (
  sizesFromModal: {
    weight: string;
    mrp: string;
    price: string;
  }[]
) => {
  if (
    !newProduct.name ||
    !newProduct.category ||
    !newProduct.weight ||
    !newProduct.price ||
    !newProduct.mrp
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const productData = {
    slug: newProduct.slug,
    name: newProduct.name,
    image:
      editingProduct !== null
        ? productsList.find((item) => item.id === editingProduct)?.image ||
          "/products/placeholder.png"
        : "/products/placeholder.png",
    category: newProduct.category,
    price: Number(newProduct.price),
    mrp: Number(newProduct.mrp),
    discount:
      Math.round(
        ((Number(newProduct.mrp) - Number(newProduct.price)) /
          Number(newProduct.mrp)) *
          100
      ) + "% OFF",
    stock: newProduct.stock,
    badge: newProduct.badge,
    is_new: newProduct.isNew,
    weight: newProduct.weight,
    description: newProduct.description,
    ingredients: newProduct.ingredients,
    usage: newProduct.usage,
    benefits: newProduct.benefits,
  };

  const finalSizes = sizesFromModal.filter(
    (size) => size.weight && size.mrp && size.price
  );

  /* =========================
     EDIT EXISTING PRODUCT
  ========================= */

  if (editingProduct !== null) {
    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", editingProduct)
      .select()
      .single();

    if (error) {
      console.error("Update product error:", error);
      alert("Product update nahi hua.");
      return;
    }

    /* =========================
       UPDATE PRODUCT SIZES
       Old sizes remove + new sizes save
    ========================= */

    const { error: deleteSizesError } = await supabase
      .from("product_sizes")
      .delete()
      .eq("product_id", editingProduct);

    if (deleteSizesError) {
      console.error(
        "Old product sizes delete error:",
        deleteSizesError
      );
      alert("Product update hua, lekin purane sizes update nahi hue.");
      return;
    }

    if (finalSizes.length > 0) {
      const sizesData = finalSizes.map((size) => ({
        product_id: editingProduct,
        weight: size.weight,
        mrp: Number(size.mrp),
        price: Number(size.price),
      }));

      const { error: sizesError } = await supabase
        .from("product_sizes")
        .insert(sizesData);

      if (sizesError) {
        console.error("Updated product sizes error:", sizesError);
        alert("Product update hua, lekin sizes save nahi hue.");
        return;
      }
    }

    const updatedProduct = {
      ...data,
      isNew: data.is_new,
      benefits: data.benefits || [],
    };

    setProductsList((prev) =>
      prev.map((item) =>
        item.id === editingProduct
          ? (updatedProduct as (typeof prev)[number])
          : item
      )
    );

    alert("Product and sizes successfully updated!");
  } else {
    /* =========================
       ADD NEW PRODUCT
    ========================= */

    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single();

    if (error) {
      console.error("Add product error:", error);
      alert("Product save nahi hua.");
      return;
    }

    /* =========================
       SAVE PRODUCT SIZES
    ========================= */

    if (finalSizes.length > 0) {
      const sizesData = finalSizes.map((size) => ({
        product_id: data.id,
        weight: size.weight,
        mrp: Number(size.mrp),
        price: Number(size.price),
      }));

      const { error: sizesError } = await supabase
        .from("product_sizes")
        .insert(sizesData);

      if (sizesError) {
        console.error("Product sizes error:", sizesError);
        alert("Product save hua, lekin sizes save nahi hue.");
        return;
      }
    }

    const newProductForList = {
      ...data,
      isNew: data.is_new,
      benefits: data.benefits || [],
    };

    setProductsList((prev) => [
      ...prev,
      newProductForList as (typeof prev)[number],
    ]);

    alert("Product successfully saved!");
  }

  setShowAddModal(false);
  setNewProduct(emptyProduct);
  setEditingProduct(null);
};

const handleEditProduct = async (
  product: (typeof productsList)[number]
) => {
  setEditingProduct(product.id);

  const { data: sizeData, error: sizesError } = await supabase
    .from("product_sizes")
    .select("weight, mrp, price")
    .eq("product_id", product.id)
    .order("id", { ascending: true });

  if (sizesError) {
    console.error("Product sizes load error:", sizesError);
  }

  setNewProduct({
    image: null,
    name: product.name,
    slug: product.slug,
    category: product.category,
    weight: product.weight,
    price: String(product.price),
    mrp: String(product.mrp),

    sizes: (sizeData || []).map((size) => ({
      weight: size.weight || "",
      mrp: String(size.mrp ?? ""),
      price: String(size.price ?? ""),
    })),

    stock: product.stock,
    badge: product.badge,
    isNew: product.isNew,
    description: product.description,
    ingredients: product.ingredients,
    usage: product.usage,
    benefits: [...(product.benefits || [])],
  });

  setShowAddModal(true);
};
const handleDeleteProduct = async (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete this product?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete product error:", error);
    alert("Product delete nahi hua.");
    return;
  }

  setProductsList((prev) =>
    prev.filter((item) => item.id !== id)
  );

  alert("Product successfully deleted!");
};
 const categories = useMemo(() => {
  return [
    "All",
    ...new Set(productsList.map((item) => item.category)),
  ];
}, [productsList]);

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-[#1B5E20]">
            Products Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all CARE WITH HERBS™ products.
          </p>
        </div>

         <button
         onClick={() => setShowAddModal(true)}
          className="bg-[#1B5E20] hover:bg-[#154818] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
       >
        + Add Product
        </button>
    </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Products</p>

          <h2 className="text-3xl font-bold mt-2 text-[#1B5E20]">
            {productsList.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">In Stock</p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {
              products.filter(
                (p) =>
                  p.stock.toLowerCase() ===
                  "in stock"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            {categories.length - 1}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">
            Featured
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            {
              products.filter(
                (p) => p.isNew
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

        </div>

      </div>
            {/* Products Table */}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#1B5E20] text-white">

              <tr>

                <th className="px-5 py-4 text-left">Image</th>

                <th className="px-5 py-4 text-left">Product</th>

                <th className="px-5 py-4 text-left">Category</th>

                <th className="px-5 py-4 text-left">Weight</th>

                <th className="px-5 py-4 text-left">Price</th>

                <th className="px-5 py-4 text-left">MRP</th>

                <th className="px-5 py-4 text-left">Stock</th>

                <th className="px-5 py-4 text-left">Status</th>

                <th className="px-5 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4">

                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-xl border bg-white p-1"
                    />

                  </td>

                  <td className="px-5 py-4">

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.slug}
                      </p>

                    </div>

                  </td>

                  <td className="px-5 py-4">
                    {product.category}
                  </td>

                  <td className="px-5 py-4">
                    {product.weight}
                  </td>

                  <td className="px-5 py-4 font-semibold text-green-700">
                    ₹{product.price}
                  </td>

                  <td className="px-5 py-4 text-gray-500 line-through">
                    ₹{product.mrp}
                  </td>

                  <td className="px-5 py-4">
                    {product.stock}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock.toLowerCase() === "in stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition">
                        👁
                      </button>

                      <button
                       onClick={() => handleEditProduct(product)}
                        className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      >
                         ✏️
                        </button>

                     <button
                      onClick={() => handleDeleteProduct(product.id)}
                     className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                   >
                       🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
            {/* Footer */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl shadow-md p-6">

        <div>

          <h3 className="text-lg font-semibold text-[#1B5E20]">
            Total Products: {filteredProducts.length}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Showing {filteredProducts.length} of {products.length} products
          </p>

        </div>

        <div className="flex gap-3">

          <button className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition">
            Previous
          </button>

          <button className="px-5 py-2 rounded-lg bg-[#1B5E20] text-white">
            1
          </button>

          <button className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition">
            Next
          </button>

        </div>

      </div>

      {/* Empty State */}

      {filteredProducts.length === 0 && (

        <div className="bg-white rounded-2xl shadow-md p-16 text-center">

          <div className="text-6xl mb-5">
            📦
          </div>

          <h2 className="text-2xl font-bold text-[#1B5E20]">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try changing your search or category filter.
          </p>

        </div>

      )}
           <AddProductModal
       title={editingProduct ? "Edit Product" : "Add New Product"}
        saveButtonText={editingProduct ? "Update Product" : "Save Product"}
       open={showAddModal}
       onClose={() => {
       setShowAddModal(false);
      setEditingProduct(null);
      setNewProduct(emptyProduct);
      }}
      onSave={handleSaveProduct}
      newProduct={newProduct}
      setNewProduct={setNewProduct}
      />
        </div>

  );
}