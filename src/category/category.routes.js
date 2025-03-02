import { Router } from "express";
import { createCategory, getCategories, editCategory, deleteCategory } from "../category/category.controller.js";
import { createCategoryValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /onlineSales/v1/categories/createCategory:
 *   post:
 *     summary: Create a new category (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       "201":
 *         description: Category created successfully.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /onlineSales/v1/categories/getCategories:
 *   get:
 *     summary: Retrieve categories.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of categories to return.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Number of categories to skip.
 *     responses:
 *       "200":
 *         description: Categories retrieved successfully.
 *       "500":
 *         description: Internal server error.
 */
router.get("/getCategories", getCategories);

/**
 * @swagger
 * /onlineSales/v1/categories/editCategory/{id}:
 *   put:
 *     summary: Update a category (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       "200":
 *         description: Category updated successfully.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.put("/editCategory/:id", editCategoryValidator, editCategory);

/**
 * @swagger
 * /onlineSales/v1/categories/deleteCategory/{id}:
 *   delete:
 *     summary: Delete a category (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to delete.
 *     responses:
 *       "200":
 *         description: Category deleted successfully.
 *       "404":
 *         description: Category or default category not found.
 *       "500":
 *         description: Internal server error.
 */
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;
