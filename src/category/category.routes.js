import { Router } from "express";
import { createCategory, getCategories, editCategory} from "../category/category.controller.js";
import { createCategoryValidator, editCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);
router.get("/getCategories", getCategories);
router.put("/editCategory/:id", editCategoryValidator, editCategory);

export default router;	
