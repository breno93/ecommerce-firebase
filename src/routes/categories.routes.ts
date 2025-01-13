import { Router } from "express";
import asyncHandler from "express-async-handler"
import { CategoriesController } from "../controllers/categories.controller.js";
import { celebrate, Segments } from "celebrate";
import { newCategorySchema } from "../models/category.model.js";



export const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHandler(CategoriesController.getAll))
categoryRoutes.get("/categories/:id", asyncHandler(CategoriesController.getById))
categoryRoutes.post("/categories", celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.save))
categoryRoutes.put("/categories/:id", celebrate({ [Segments.BODY]: newCategorySchema }), asyncHandler(CategoriesController.update))
categoryRoutes.delete("/categories/:id", asyncHandler(CategoriesController.delete))
