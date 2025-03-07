import {Router} from "express";

import { completePurchaseValidator, getPurchasesValidator, updateInvoiceValidator, getInvoiceByUserValidator } from "../middlewares/invoice-validators.js";
import { completePurchase, getPurchases, updateInvoice, getInvoiceByUser } from "./invoice.controller.js";

const router = Router();

/**
 * @swagger
 * /onlineSales/v1/invoice/completePurchase:
 *   get:
 *     summary: Complete a purchase and generate an invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     description: Processes a purchase from the user's cart, generates an invoice and updates product stock
 *     responses:
 *       200:
 *         description: Purchase completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Purchase completed successfully
 *                 invoice:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     date:
 *                       type: string
 *                     products:
 *                       type: array
 *                     total:
 *                       type: number
 *       400:
 *         description: Bad request - Cart is empty/not found or user is deactivated or doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Cart is empty or not found
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - User does not have CLIENT_ROLE
 *       500:
 *         description: Server error - Error completing purchase or validating token
 */
router.get(
    "/completePurchase",
    completePurchaseValidator,
    completePurchase
)

/**
 * @swagger
 * /onlineSales/v1/invoice/getPurchases:
 *   get:
 *     summary: Get user purchase history
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves all invoices for the authenticated user
 *     responses:
 *       200:
 *         description: Successfully retrieved purchase history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 invoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user:
 *                         type: string
 *                       date:
 *                         type: string
 *                       products:
 *                         type: array
 *                       total:
 *                         type: number
 *       400:
 *         description: Bad request - No purchases found, user deactivated or doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No purchases found
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - User does not have CLIENT_ROLE
 *       500:
 *         description: Server error - Error retrieving purchases or validating token
 */
router.get(
    "/getPurchases",
    getPurchasesValidator,
    getPurchases
)

/**
 * @swagger
 * /onlineSales/v1/invoice/updateInvoice/{id}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     description: Updates an invoice's product quantity and recalculates totals (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
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
 *                 description: ID of the product to update
 *               quantity:
 *                 type: number
 *                 description: New quantity for the product
 *           example:
 *             productId: "67c4d53488f4d6ce4a9bb02d"
 *             quantity: 4
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Invoice updated successfully
 *                 invoice:
 *                   type: object
 *       400:
 *         description: Bad request - Invoice not found, product not found, insufficient stock, or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invoice not found
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - User does not have ADMIN_ROLE
 *       500:
 *         description: Server error - Error updating invoice or validating token
 */
router.put(
    "/updateInvoice/:id",
    updateInvoiceValidator,
    updateInvoice
)

/**
 * @swagger
 * /onlineSales/v1/invoice/getInvoiceByUser/{uid}:
 *   get:
 *     summary: Get invoices for a specific user
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves invoices for a specific user (Admin only)
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of invoices to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of invoices to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                 invoices:
 *                   type: array
 *       400:
 *         description: Bad request - Invalid user ID or user doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User does not exist in DB
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - User does not have ADMIN_ROLE
 *       500:
 *         description: Server error - Error fetching invoices or validating token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error fetching invoices
 *                 error:
 *                   type: string
 */
router.get(
    "/getInvoiceByUser/:uid",
    getInvoiceByUserValidator,
    getInvoiceByUser
)
export default router;