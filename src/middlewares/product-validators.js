"use strict"
import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validators.js";
import { productExists } from "../helpers/db-validators.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("category").notEmpty().isMongoId().withMessage("Invalid category ID"),
    body("category").custom(categoryExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const getProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().isMongoId().withMessage("Invalid product ID"),
    param("pid").custom(productExists),
    validarCampos,
    handleErrors
]