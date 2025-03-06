
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";


export const completePurchaseValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

