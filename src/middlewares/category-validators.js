import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";

export const createCategoryValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [
    param("id").isMongoId().withMessage("Invalid category id"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    param("id").isMongoId().withMessage("Invalid category id"),
    validarCampos,
    handleErrors
]

