import { create } from "zustand";
//
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  // **************** CRUD OPS ****************** //
  // Create Product
  createProduct: async (newProduct) => {
    try {
      if (newProduct.title && newProduct.image && newProduct.price) {
        const res = await fetch("/api/addProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: "Please fill all fields" };
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },

  // Read/Fetch List of Products
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/allProducts");
      const data = await res.json();
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },

  // Update Products
  updateProduct: async (pid, updatedProduct) => {
    try {
      if (pid) {
        const res = await fetch(`/api/updateProduct/${pid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (data.success) {
          // The set method will automaticaly update your UI with your data WITHOUT REFERESHING The Browser
          set((state) => ({ products: state.products.map((product) => (product._id === pid ? data.data : product)) }));
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message };
        }
      }
    } catch (error) {
      return { success: false, message: "Invalid product ID" };
    }
  },

  // Delete Products
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/deleteProduct/${pid}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        // update the ui immediately without needing refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred while deleting the product." };
    }
  },

  // Close all
}));

export default useProductStore;
