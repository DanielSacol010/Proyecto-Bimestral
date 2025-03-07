import {Router} from "express";

import { completePurchaseValidator, getPurchasesValidator, updateInvoiceValidator, getInvoiceByUserValidator } from "../middlewares/invoice-validators.js";
import { completePurchase, getPurchases, updateInvoice, getInvoiceByUser } from "./invoice.controller.js";

const router = Router();

router.get(
    "/completePurchase",
    completePurchaseValidator,
    completePurchase
)

router.get(
    "/getPurchases",
    getPurchasesValidator,
    getPurchases
)

router.put(
    "/updateInvoice/:id",
    updateInvoiceValidator,
    updateInvoice
)

router.get(
    "/getInvoiceByUser/:uid",
    getInvoiceByUserValidator,
    getInvoiceByUser
)
export default router;