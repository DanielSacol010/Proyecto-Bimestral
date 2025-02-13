import { Router } from "express";
import { createCategory, getCategories, editCategory, deleteCategory } from "../category/category.controller.js";
import { createCategoryValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);
router.get("/getCategories", getCategories);
router.put("/editCategory/:id", editCategoryValidator, editCategory);
router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;	
