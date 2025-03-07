
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import {body, param } from "express-validator";
import { userExists } from "../helpers/db-validators.js";


export const completePurchaseValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const getPurchasesValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]


export const updateInvoiceValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").notEmpty().isMongoId().withMessage("Invalid invoice id"),
    body("productId").notEmpty().isMongoId().withMessage("Invalid product id"),
    body("quantity").notEmpty().isNumeric().withMessage("Invalid quantity"),
    validarCampos,
    handleErrors
]

export const getInvoiceByUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").notEmpty().isMongoId().withMessage("Invalid user id").custom(userExists),
    validarCampos,
    handleErrors
]

