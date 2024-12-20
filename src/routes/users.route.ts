import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import asyncHandler from "express-async-handler"
import { celebrate, Segments } from "celebrate";
import { newUserSchema, UpdateUserSchema } from "../models/user.model.js";


export const userRoutes = Router()

userRoutes.get("/users", asyncHandler(UsersController.getAll));
userRoutes.get("/users/:id", asyncHandler(UsersController.getById))
userRoutes.post("/users", celebrate({ [Segments.BODY]: newUserSchema }), asyncHandler(UsersController.save))
userRoutes.put("/users/:id", celebrate({ [Segments.BODY]: UpdateUserSchema }), asyncHandler(UsersController.update))
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete))