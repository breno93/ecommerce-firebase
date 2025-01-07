import { Router } from "express";



export const categoryRoutes = Router();

categoryRoutes.get("/categories")
categoryRoutes.get("/categories/:id")
categoryRoutes.post("/categories")
categoryRoutes.put("/categories/:id")
categoryRoutes.delete("/categories/:id")