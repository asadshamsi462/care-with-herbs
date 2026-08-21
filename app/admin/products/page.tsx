"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import products from "@/app/data/products";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddProductModal, {
  type NewProduct,
} from "@/app/components/admin/AddProductModal";

type ProductSize = {
  weight: string;
  mrp: number;
  price: number;
};

type AdminProduct = (typeof products)[number] & {
  sizes: ProductSize[];
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const [productsList, setProductsList] = useState<AdminProduct[]>(
    products.map((product) => ({
      ...product,
      sizes: [],
    })) as AdminProduct[]
  );

  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const router = useRouter();

  /*
  ============================================================
  LOAD PRODUCTS + PRODUCT SIZES
  ============================================================
  */

  useEffect(() => {
    const loadProducts = async () => {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (productError) {
        console.error("Supabase products error:", productError);
        return;
      }

      const { data: sizeData, error: sizeError } = await supabase
        .from("product_sizes")
        .select("id, product_id, weight, mrp, price")
        .order("id", { ascending: true });

      if (sizeError) {
        console.error("Supabase product sizes error:", sizeError);
      }

      const formattedProducts: AdminProduct[] = (productData || []).map(
        (product) => {
          const sizes =
            sizeData
              ?.filter((size) => size.product_id === product.id)
              .map((size) => ({
                weight: size.weight || "",
                mrp: Number(size.mrp || 0),
                price: Number(size.price || 0),
              }))
              .sort((a, b) => {
                const getWeightNumber = (weight: string) => {
                  const value = parseFloat(weight);
                  if (weight.toUpperCase().includes("KG")) {
                    return value * 1000;
                  }
                  return value;
                };

                return (
                  getWeightNumber(a.weight) -
                  getWeightNumber(b.weight)
                );
              }) || [];

          return {
            ...product,
            isNew: product.is_new,
            benefits: product.benefits || [],
            sizes,
          } as AdminProduct;
        }
      );

      setProductsList(formattedProducts);
    };

    loadProducts();
  }, []);

  /*
  ============================================================
  EMPTY PRODUCT
  ============================================================
  */

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

  const [newProduct, setNewProduct] =
    useState<NewProduct>(emptyProduct);

  /*
  ============================================================
  SAVE PRODUCT
  ============================================================
  */

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

    /*
    ==========================================================
    UPLOAD PRODUCT IMAGE
    ==========================================================
    */

    let imageUrl =
      editingProduct !== null
        ? productsList.find(
            (item) => item.id === editingProduct
          )?.image || "/products/placeholder.png"
        : "/products/placeholder.png";

    if (newProduct.image instanceof File) {
      const file = newProduct.image;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("Image size 10MB se kam honi chahiye.");
        return;
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "png";

      const safeSlug = newProduct.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-");

      const filePath =
        `products/${safeSlug}-${Date.now()}.${extension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("product-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

      if (uploadError) {
        console.error(
          "Product image upload error:",
          uploadError
        );

        alert("Product image upload nahi hui.");
        return;
      }

      const { data: publicUrlData } =
        supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    /*
    ==========================================================
    PRODUCT MAIN DATA
    ==========================================================
    */

    const productData = {
      slug: newProduct.slug,
      name: newProduct.name,
      image: imageUrl,
      category: newProduct.category,

      price: Number(newProduct.price),
      mrp: Number(newProduct.mrp),

      discount:
        Number(newProduct.mrp) > 0
          ? Math.round(
              ((Number(newProduct.mrp) -
                Number(newProduct.price)) /
                Number(newProduct.mrp)) *
                100
            ) + "% OFF"
          : "0% OFF",

      stock: newProduct.stock,
      badge: newProduct.badge,
      is_new: newProduct.isNew,
      weight: newProduct.weight,

      description: newProduct.description,
      ingredients: newProduct.ingredients,
      usage: newProduct.usage,
      benefits: newProduct.benefits,
    };

    /*
    ==========================================================
    VALID SIZE DATA
    ==========================================================
    */

    const finalSizes = sizesFromModal
      .filter(
        (size) =>
          size.weight.trim() &&
          size.mrp.trim() &&
          size.price.trim()
      )
      .map((size) => ({
        weight: size.weight.trim(),
        mrp: Number(size.mrp),
        price: Number(size.price),
      }));

    /*
    ==========================================================
    EDIT EXISTING PRODUCT
    ==========================================================
    */

    if (editingProduct !== null) {
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct)
        .select()
        .single();

      if (error) {
        console.error(
          "Update product error:",
          error
        );

        alert("Product update nahi hua.");
        return;
      }

      /*
      --------------------------------------------------------
      DELETE OLD SIZES
      --------------------------------------------------------
      */

      const { error: deleteSizesError } =
        await supabase
          .from("product_sizes")
          .delete()
          .eq("product_id", editingProduct);

      if (deleteSizesError) {
        console.error(
          "Old product sizes delete error:",
          deleteSizesError
        );

        alert(
          "Product update hua, lekin purane sizes update nahi hue."
        );

        return;
      }

      /*
      --------------------------------------------------------
      INSERT NEW SIZES
      --------------------------------------------------------
      */

      if (finalSizes.length > 0) {
        const sizesData = finalSizes.map(
          (size) => ({
            product_id: editingProduct,
            weight: size.weight,
            mrp: size.mrp,
            price: size.price,
          })
        );

        const { error: sizesError } =
          await supabase
            .from("product_sizes")
            .insert(sizesData);

        if (sizesError) {
          console.error(
            "Updated product sizes error:",
            sizesError
          );

          alert(
            "Product update hua, lekin sizes save nahi hue."
          );

          return;
        }
      }

      /*
      --------------------------------------------------------
      UPDATE LOCAL ADMIN LIST
      --------------------------------------------------------
      */

      const updatedProduct: AdminProduct = {
        ...data,
        isNew: data.is_new,
        benefits: data.benefits || [],
        sizes: finalSizes,
      } as AdminProduct;

      setProductsList((prev) =>
        prev.map((item) =>
          item.id === editingProduct
            ? updatedProduct
            : item
        )
      );

      alert(
        "Product and sizes successfully updated!"
      );
    } else {
      /*
      ========================================================
      ADD NEW PRODUCT
      ========================================================
      */

      const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single();

      if (error) {
        console.error(
          "Add product error:",
          error
        );

        alert("Product save nahi hua.");
        return;
      }

      /*
      --------------------------------------------------------
      SAVE PRODUCT SIZES
      --------------------------------------------------------
      */

      if (finalSizes.length > 0) {
        const sizesData = finalSizes.map(
          (size) => ({
            product_id: data.id,
            weight: size.weight,
            mrp: size.mrp,
            price: size.price,
          })
        );

        const { error: sizesError } =
          await supabase
            .from("product_sizes")
            .insert(sizesData);

        if (sizesError) {
          console.error(
            "Product sizes error:",
            sizesError
          );

          alert(
            "Product save hua, lekin sizes save nahi hue."
          );

          return;
        }
      }

      const newProductForList: AdminProduct = {
        ...data,
        isNew: data.is_new,
        benefits: data.benefits || [],
        sizes: finalSizes,
      } as AdminProduct;

      setProductsList((prev) => [
        ...prev,
        newProductForList,
      ]);

      alert(
        "Product successfully saved!"
      );
    }

    setShowAddModal(false);
    setNewProduct(emptyProduct);
    setEditingProduct(null);
  };

  /*
  ============================================================
  EDIT PRODUCT
  ============================================================
  */

  const handleEditProduct = async (
    product: AdminProduct
  ) => {
    setEditingProduct(product.id);

    const {
      data: sizeData,
      error: sizesError,
    } = await supabase
      .from("product_sizes")
      .select("weight, mrp, price")
      .eq("product_id", product.id)
      .order("id", {
        ascending: true,
      });

    if (sizesError) {
      console.error(
        "Product sizes load error:",
        sizesError
      );
    }

    setNewProduct({
      image: null,

      name: product.name,
      slug: product.slug,
      category: product.category,

      weight: product.weight,
      price: String(product.price),
      mrp: String(product.mrp),

      sizes: (sizeData || []).map(
        (size) => ({
          weight: size.weight || "",
          mrp: String(size.mrp ?? ""),
          price: String(size.price ?? ""),
        })
      ),

      stock: product.stock,
      badge: product.badge,
      isNew: product.isNew,

      description: product.description,
      ingredients: product.ingredients,
      usage: product.usage,

      benefits: [
        ...(product.benefits || []),
      ],
    });

    setShowAddModal(true);
  };

  /*
  ============================================================
  DELETE PRODUCT
  ============================================================
  */

  const handleDeleteProduct = async (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to permanently delete this product?"
      );

    if (!confirmDelete) return;

    const product =
      productsList.find(
        (item) => item.id === id
      );

    if (!product) {
      alert("Product nahi mila.");
      return;
    }

    /*
    ----------------------------------------------------------
    1. DELETE PRODUCT SIZES
    ----------------------------------------------------------
    */

    const { error: sizesError } =
      await supabase
        .from("product_sizes")
        .delete()
        .eq("product_id", id);

    if (sizesError) {
      console.error(
        "Delete product sizes error:",
        sizesError
      );

      alert(
        "Product sizes delete nahi hue."
      );

      return;
    }

    /*
    ----------------------------------------------------------
    2. DELETE PRODUCT IMAGE
    ----------------------------------------------------------
    */

    if (
      product.image &&
      product.image.includes(
        "/storage/v1/object/public/product-images/"
      )
    ) {
      try {
        const imagePath =
          decodeURIComponent(
            product.image.split(
              "/storage/v1/object/public/product-images/"
            )[1]
          );

        if (imagePath) {
          const {
            error: imageError,
          } = await supabase.storage
            .from("product-images")
            .remove([imagePath]);

          if (imageError) {
            console.error(
              "Delete product image error:",
              imageError
            );

            alert(
              "Product image delete nahi hui. Product delete nahi kiya gaya."
            );

            return;
          }
        }
      } catch (imageError) {
        console.error(
          "Product image path error:",
          imageError
        );

        alert(
          "Product image process nahi ho saki. Product delete nahi kiya gaya."
        );

        return;
      }
    }

    /*
    ----------------------------------------------------------
    3. DELETE PRODUCT
    ----------------------------------------------------------
    */

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(
        "Product delete nahi hua."
      );

      return;
    }

    /*
    ----------------------------------------------------------
    4. UPDATE LOCAL LIST
    ----------------------------------------------------------
    */

    setProductsList((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      "Product successfully deleted!"
    );
  };

  /*
  ============================================================
  CATEGORIES
  ============================================================
  */

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        productsList.map(
          (item) => item.category
        )
      ),
    ];
  }, [productsList]);

  /*
  ============================================================
  FILTER PRODUCTS
  ============================================================
  */

  const filteredProducts =
    productsList.filter(
      (product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === "All" ||
          product.category ===
            category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  /*
  ============================================================
  DISPLAY HELPERS
  ============================================================
  */

  const getDisplaySizes = (
    product: AdminProduct
  ): ProductSize[] => {
    if (
      product.sizes &&
      product.sizes.length > 0
    ) {
      return product.sizes;
    }

    return [
      {
        weight: product.weight,
        price: Number(product.price),
        mrp: Number(product.mrp),
      },
    ];
  };

  const getSizeText = (
    product: AdminProduct
  ) => {
    const sizes =
      getDisplaySizes(product);

    return sizes
      .map(
        (size) =>
          size.weight
      )
      .join(" • ");
  };

  const getPriceText = (
    product: AdminProduct
  ) => {
    const sizes =
      getDisplaySizes(product);

    return sizes
      .map(
        (size) =>
          `₹${size.price}`
      )
      .join(" • ");
  };

  const getMrpText = (
    product: AdminProduct
  ) => {
    const sizes =
      getDisplaySizes(product);

    return sizes
      .map(
        (size) =>
          `₹${size.mrp}`
      )
      .join(" • ");
  };

  /*
  ============================================================
  PAGE
  ============================================================
  */

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
          onClick={() => {
            setEditingProduct(null);
            setNewProduct(emptyProduct);
            setShowAddModal(true);
          }}
          className="bg-[#1B5E20] hover:bg-[#154818] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          + Add Product
        </button>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#1B5E20]">
            {productsList.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500">
            In Stock
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {
              productsList.filter(
                (p) =>
                  p.stock?.toLowerCase() ===
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
              productsList.filter(
                (p) => p.isNew
              ).length
            }
          </h2>
        </div>

      </div>

      {/* =====================================================
          SEARCH & FILTER
      ===================================================== */}

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
            {categories.map(
              (cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )}
          </select>

        </div>

      </div>

      {/* =====================================================
          PRODUCTS TABLE
      ===================================================== */}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-[#1B5E20] text-white">

              <tr>

                <th className="px-5 py-4 text-left">
                  Image
                </th>

                <th className="px-5 py-4 text-left">
                  Product
                </th>

                <th className="px-5 py-4 text-left">
                  Category
                </th>

                <th className="px-5 py-4 text-left">
                  Weight
                </th>

                <th className="px-5 py-4 text-left">
                  Price
                </th>

                <th className="px-5 py-4 text-left">
                  MRP
                </th>

                <th className="px-5 py-4 text-left">
                  Stock
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map(
                (product) => {

                  const sizes =
                    getDisplaySizes(
                      product
                    );

                  return (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50 transition"
                    >

                      {/* IMAGE */}

                      <td className="px-5 py-4">

                        <Image
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                          width={60}
                          height={60}
                          className="rounded-xl border bg-white p-1"
                        />

                      </td>

                      {/* PRODUCT */}

                      <td className="px-5 py-4">

                        <div>

                          <h3 className="font-semibold text-gray-800">
                            {
                              product.name
                            }
                          </h3>

                          <p className="text-sm text-gray-500">
                            {
                              product.slug
                            }
                          </p>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4">
                        {
                          product.category
                        }
                      </td>

                      {/* WEIGHT */}

                      <td className="px-5 py-4">

                        <div className="flex flex-wrap gap-2">

                          {sizes.map(
                            (
                              size,
                              index
                            ) => (
                              <span
                                key={`${product.id}-${size.weight}-${index}`}
                                className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800 whitespace-nowrap"
                              >
                                {
                                  size.weight
                                }
                              </span>
                            )
                          )}

                        </div>

                      </td>

                      {/* PRICE */}

                      <td className="px-5 py-4 font-semibold text-green-700 whitespace-nowrap">

                        {getPriceText(
                          product
                        )}

                      </td>

                      {/* MRP */}

                      <td className="px-5 py-4 text-gray-500 line-through whitespace-nowrap">

                        {getMrpText(
                          product
                        )}

                      </td>

                      {/* STOCK */}

                      <td className="px-5 py-4">
                        {
                          product.stock
                        }
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock?.toLowerCase() ===
                            "in stock"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            product.stock
                          }
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              router.push(
                                `/product/${product.slug}`
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                            title="View Product"
                          >
                            👁
                          </button>

                          <button
                            onClick={() =>
                              handleEditProduct(
                                product
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            title="Edit Product"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteProduct(
                                product.id
                              )
                            }
                            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                            title="Delete Product"
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl shadow-md p-6">

        <div>

          <h3 className="text-lg font-semibold text-[#1B5E20]">
            Total Products:{" "}
            {filteredProducts.length}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Showing{" "}
            {filteredProducts.length}{" "}
            of{" "}
            {productsList.length}{" "}
            products
          </p>

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Previous
          </button>

          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-[#1B5E20] text-white"
          >
            1
          </button>

          <button
            type="button"
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Next
          </button>

        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredProducts.length ===
        0 && (
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

      {/* =====================================================
          ADD / EDIT PRODUCT MODAL
      ===================================================== */}

      <AddProductModal
        title={
          editingProduct !== null
            ? "Edit Product"
            : "Add New Product"
        }
        saveButtonText={
          editingProduct !== null
            ? "Update Product"
            : "Save Product"
        }
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