import { body, param } from "express-validator";
import { emailExists, usernameExists, isClientRole } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().isString().withMessage("Invalid username format"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors
];

export const createUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const modifyRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Invalid user ID").custom(isClientRole),
    body("role").isIn(["ADMIN_ROLE"]).withMessage("Invalid role"),
    validarCampos,
    handleErrors
];

export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const updateUserValidatorAdmin = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Invalid user ID"),
    param("uid").custom(isClientRole),
    body("name").optional(),
    body("username").optional(),
    body("phone").optional(),
    body("surname").optional(),
    body("email").optional().isEmail().withMessage("Invalid email"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Invalid user ID"),
    param("uid").custom(isClientRole),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors

]

export const deleteUserClientValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    body("password").notEmpty().withMessage("Password is required"),
    validarCampos,
    handleErrors
]