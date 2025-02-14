import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
export const createCategoryValidator = [    
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [  
    validateJWT,
    hasRoles("ADMIN"),
    param("id").isMongoId().withMessage("Invalid category id"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [                    
    validateJWT,
    hasRoles("ADMIN"),
    param("id").isMongoId().withMessage("Invalid category id"),
    validarCampos,
    handleErrors
]

