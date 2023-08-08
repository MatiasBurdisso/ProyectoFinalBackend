import { Router } from "express";
import {
  deleteProduct,
  paginatedProducts,
  postProducts,
  updateSpecifiedProduct,
} from "../Controllers/productsRouteDBController.js";
import DATA from "../DAO/factory.js";
import productModel from "../DAO/models/productsModel.js";

const router = Router();
const { ProductManager } = DATA;
const productManager = new ProductManager(); // I should delete this, right?

router.get("/", paginatedProducts);

router.post("/", postProducts);

router.delete("/:id", deleteProduct);

router.put("/:id", updateSpecifiedProduct);

export default router;