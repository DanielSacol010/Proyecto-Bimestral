import { Router } from "express";
import { addToCart, getCart, deleteProductFromCart } from "./cart.controller.js";
import { addToCartValidator, getCartValidator, deleteProductFromCartValidator } from "../middlewares/cart-validators.js";

const router = Router();

/**
 * @swagger
 * /onlineSales/v1/cart/addToCart:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Add a product to the cart.
 *     description: Allows a client (CLIENT_ROLE) to add a product to their shopping cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The product ID to add.
 *                 example: "60d0fe4f5311236168a109ca"
 *               quantity:
 *                 type: number
 *                 description: The number of units to add.
 *                 example: 3
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *       400:
 *         description: Bad Request (e.g., product not found, out of stock, insufficient quantity, or invalid parameters).
 *       500:
 *         description: Server error.
 */
router.post(
    "/addToCart",
    addToCartValidator,
    addToCart
);

/**
 * @swagger
 * /onlineSales/v1/cart/getCart:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Retrieve the cart.
 *     description: Returns the client's cart including a list of products and the overall total.
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *       400:
 *         description: Cart not found.
 *       500:
 *         description: Server error.
 */
router.get(
    "/getCart",
    getCartValidator,
    getCart
);

/**
 * @swagger
 * /onlineSales/v1/cart/deleteProductFromCart/{productId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Cart
 *     summary: Delete a product from the cart.
 *     description: Removes the specified product from the client's cart.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove.
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *       400:
 *         description: Bad Request (e.g., cart not found or product not in cart).
 *       500:
 *         description: Server error.
 */
router.delete(
    "/deleteProductFromCart/:productId",
    deleteProductFromCartValidator,
    deleteProductFromCart
);

export default router;

