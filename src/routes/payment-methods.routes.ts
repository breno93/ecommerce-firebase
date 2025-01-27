import { Router } from "express";
import asyncHandler from "express-async-handler"
import { PaymentMethodsController } from "../controllers/payment-method.controller.js";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, newUpdatePaymentSchema } from "../models/payment-method.model.js";


export const paymentMethodsRoutes = Router()

paymentMethodsRoutes.get("/payment-method", asyncHandler(PaymentMethodsController.getAll))
paymentMethodsRoutes.get("/payment-method/:id", asyncHandler(PaymentMethodsController.getById))
paymentMethodsRoutes.post("/payment-method", celebrate({ [Segments.BODY]: newPaymentSchema }), asyncHandler(PaymentMethodsController.save))
paymentMethodsRoutes.put("/payment-method/:id", celebrate({ [Segments.BODY]: newUpdatePaymentSchema }), asyncHandler(PaymentMethodsController.update))
paymentMethodsRoutes.delete("/payment-method/:id", asyncHandler(PaymentMethodsController.delete))
