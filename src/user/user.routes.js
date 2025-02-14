import { Router } from "express";
import { createUser, modifyRole, updateUserAdmin, deleteUser, updateUserClient, updatePassword, updateProfilePicture, deleteUserClient } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createUserValidator, modifyRoleValidator, updateUserValidatorAdmin, deleteUserValidator, updateUserValidatorClient, updatePasswordValidator, updateProfilePictureValidator, deleteUserClientValidator } from "../middlewares/user-validators.js";

const router = Router();

router.post(
    "/createUser",
    uploadProfilePicture.single("profilePicture"), 
    createUserValidator, 
    deleteFileOnError,
    createUser
)

router.patch(
    "/modifyRole/:uid",
    modifyRoleValidator,
    modifyRole
)

router.patch(
    "/updateUser/:uid",
    updateUserValidatorAdmin,
    updateUserAdmin
)

router.delete(
    "/deleteUser/:uid",
    deleteUserValidator,
    deleteUser
)

router.put(
    "/updateUser",
    updateUserValidatorClient,
    updateUserClient
    
)

router.patch(
    "/updatePassword", 
    updatePasswordValidator,
    updatePassword
)

router.patch(
    "/updateProfilePicture",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
)

router.delete(
    "/deleteUser",
    deleteUserClientValidator,
    deleteUserClient
)


export default router;