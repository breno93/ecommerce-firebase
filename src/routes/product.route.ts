import { Router } from "express";
import asyncHandler from "express-async-handler";
import { ProductsController } from "../controllers/products.controller.js";
import { celebrate, Segments } from "celebrate";
import { newProductSchema } from "../models/product.model.js";



export const productRoutes = Router()

productRoutes.get("/products", asyncHandler(ProductsController.getAll))
productRoutes.get("/products/:id", asyncHandler(ProductsController.getById))
productRoutes.post("/products", celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.save))
productRoutes.put("/products/:id", celebrate({ [Segments.BODY]: newProductSchema }), asyncHandler(ProductsController.update))
productRoutes.delete("/products/:id", asyncHandler(ProductsController.delete))