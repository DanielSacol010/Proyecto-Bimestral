import {Router} from "express";

import { completePurchaseValidator } from "../middlewares/invoice-validators.js";
import { completePurchase } from "./invoice.controller.js";

const router = Router();

router.get(
    "/completePurchase",
    completePurchaseValidator,
    completePurchase
)

export default router;