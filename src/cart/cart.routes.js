import { Router } from "express";
import { addToCart, getCart, deleteProductFromCart } from "./cart.controller.js";
import { addToCartValidator, getCartValidator, deleteProductFromCartValidator } from "../middlewares/cart-validators.js";
const router = Router();

router.post(
    "/addToCart", 
    addToCartValidator, 
    addToCart
);

router.get(
    "/getCart", 
    getCartValidator, 
    getCart
);

router.delete(
    "/deleteProductFromCart/:productId", 
    deleteProductFromCartValidator, 
    deleteProductFromCart
);


export default router;

