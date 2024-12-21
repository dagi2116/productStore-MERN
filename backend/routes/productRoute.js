import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
//
const productRouter = express.Router();

// App Routes

productRouter.get("/allProducts", getProducts);
productRouter.post("/addProduct", addProduct);
productRouter.put("/updateProduct/:id", updateProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);

//
export default productRouter;
