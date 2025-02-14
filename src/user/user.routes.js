import { Router } from "express";
import { createUser, modifyRole, updateUser, deleteUser } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createUserValidator, modifyRoleValidator, updateUserValidator, deleteUserValidator } from "../middlewares/user-validators.js";

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
    updateUserValidator,
    updateUser
)

router.delete(
    "/deleteUser/:uid",
    deleteUserValidator,
    deleteUser
)

export default router;