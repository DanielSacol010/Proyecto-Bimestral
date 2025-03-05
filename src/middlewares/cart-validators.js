import { body,param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { productExists } from "../helpers/db-validators.js";

export const addToCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    body("productId").isMongoId().withMessage("Invalid product id"),
    body("productId").custom(productExists),
    body("quantity").isNumeric().withMessage("Quantity must be a number"),
    validarCampos,
    handleErrors
]

export const getCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteProductFromCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    param("productId").isMongoId().withMessage("Invalid product id"),
    param("productId").custom(productExists),
    validarCampos,
    handleErrors
]