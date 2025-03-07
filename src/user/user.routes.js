import { Router } from "express";
import { createUser, modifyRole, updateUserAdmin, deleteUser, updateUser, updatePassword, updateProfilePicture, deleteUserClient, getUsers } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createUserValidator, modifyRoleValidator, updateUserValidatorAdmin, deleteUserValidator, updateUserValidator, updatePasswordValidator, updateProfilePictureValidator, deleteUserClientValidator, getUsersValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /onlineSales/v1/users/createUser:
 *   post:
 *     summary: Create a new user (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ "ADMIN_ROLE", "CLIENT_ROLE" ]
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *             required:
 *               - name
 *               - surname
 *               - username
 *               - email
 *               - phone
 *               - password
 *     responses:
 *       "201":
 *         description: User has been created.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.post(
    "/createUser",
    uploadProfilePicture.single("profilePicture"), 
    createUserValidator, 
    deleteFileOnError,
    createUser  
);

/**
 * @swagger
 * /onlineSales/v1/users/modifyRole/{uid}:
 *   patch:
 *     summary: Modify the role of a user (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose role is to be modified.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ "ADMIN_ROLE", "CLIENT_ROLE" ]
 *             required:
 *               - role
 *     responses:
 *       "200":
 *         description: User role has been modified.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.patch(
    "/modifyRole/:uid",
    modifyRoleValidator,
    modifyRole
);

/**
 * @swagger
 * /onlineSales/v1/users/updateUser/{uid}:
 *   put:
 *     summary: Update a user (admin version).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               name: "John"
 *               username: "john123"
 *     responses:
 *       "200":
 *         description: User has been updated.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.put(
    "/updateUser/:uid",
    updateUserValidatorAdmin,
    updateUserAdmin
);

/**
 * @swagger
 * /onlineSales/v1/users/deleteUser/{uid}:
 *   delete:
 *     summary: Delete a user (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete.
 *     responses:
 *       "200":
 *         description: User has been deleted.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.delete(
    "/deleteUser/:uid",
    deleteUserValidator,
    deleteUser
);

/**
 * @swagger
 * /onlineSales/v1/users/updateUser:
 *   put:
 *     summary: Update the authenticated user's information.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               name: "Jane"
 *     responses:
 *       "200":
 *         description: User has been updated.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.put(
    "/updateUser",
    updateUserValidator,
    updateUser
);

/**
 * @swagger
 * /onlineSales/v1/users/getUsers:
 *   get:
 *     summary: Get a list of users (admin only).
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of users to return.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of users to skip.
 *     responses:
 *       "200":
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       "400":
 *         description: Bad request.
 *       "401":
 *         description: Unauthorized.
 *       "500":
 *         description: Internal server error.
 */
router.get(
    "/getUsers",
    getUsersValidator,
    getUsers
)

/**
 * @swagger
 * /onlineSales/v1/users/updatePassword:
 *   patch:
 *     summary: Update the authenticated user's password.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *             required:
 *               - newPassword
 *     responses:
 *       "200":
 *         description: Password updated.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.patch(
    "/updatePassword", 
    updatePasswordValidator,
    updatePassword
);

/**
 * @swagger
 * /onlineSales/v1/users/updateProfilePicture:
 *   patch:
 *     summary: Update the authenticated user's profile picture.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *             required:
 *               - profilePicture
 *     responses:
 *       "200":
 *         description: Profile picture updated.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.patch(
    "/updateProfilePicture",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
);

/**
 * @swagger
 * /onlineSales/v1/users/deleteUser:
 *   delete:
 *     summary: Delete the authenticated user's account.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       "200":
 *         description: User account deleted.
 *       "400":
 *         description: Bad request.
 *       "500":
 *         description: Internal server error.
 */
router.delete(
    "/deleteUser",
    deleteUserClientValidator,
    deleteUserClient
);

export default router;