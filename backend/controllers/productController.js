import mongoose from "mongoose";
import Product from "../models/productModel.js";

//                  CRUD OPERATION

// Read
export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const amount = allProducts.length + " products";
    res.status(200).json({ success: true, total: amount, data: allProducts });
  } catch (error) {
    console.log("Errod in fetching Products", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};

// Create / Add
export const addProduct = async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.title || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please fill all the fields " });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct, message: "Product Addded Successfully!(Server)" });
  } catch (error) {
    console.log("Error in adding Product:", error.message);
    res.status(501).json({ success: false, message: "Server error" });
  }
};

//Update

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  //
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product ID" });
  }
  //
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated Succesfuly(Server)" });
  } catch (error) {
    console.log("Error in deleting Products", error.message);
    res.status(500).json({ success: false, message: "Product not updated" });
  }
};

// Delete

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product ID" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted Successfully! (Server)" });
  } catch (error) {
    console.log("Error in deleting Products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
