import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /onlineSales/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - username
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 25
 *                 description: User's first name (required)
 *                 example: John
 *               surname:
 *                 type: string
 *                 maxLength: 25
 *                 description: User's last name (required)
 *                 example: Doe
 *               username:
 *                 type: string
 *                 description: User's unique username (required, must be unique)
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address (required, must be unique)
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 8
 *                 description: User's phone number (required, exactly 8 digits)
 *                 example: 12345678
 *               password:
 *                 type: string
 *                 format: password
 *                 description: |
 *                   User's password (required)
 *                   Must be at least 8 characters long
 *                   Must contain at least 1 lowercase letter
 *                   Must contain at least 1 uppercase letter
 *                   Must contain at least 1 number
 *                   Must contain at least 1 symbol
 *                 example: Passw0rd*
 *               role:
 *                 type: string
 *                 enum: [ADMIN_ROLE, CLIENT_ROLE]
 *                 default: CLIENT_ROLE
 *                 description: User's role (optional)
 *                 example: CLIENT_ROLE
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: User's profile picture (optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User has been created
 *                 name:
 *                   type: string
 *                   example: John
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Password must be at least 8 characters long
 *                       param:
 *                         type: string
 *                         example: password
 *                       location:
 *                         type: string
 *                         example: body
 *       409:
 *         description: Conflict - Username or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: Email already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registration failed
 *                 error:
 *                   type: string
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    deleteFileOnError,
    register
)

/**
 * @swagger
 * /onlineSales/v1/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address (either email or username is required)
 *                 example: john.doe@example.com
 *               username:
 *                 type: string
 *                 description: User's username (alternative to email)
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (required, min length 4 characters)
 *                 example: Passw0rd*
 *             example:
 *               email: john.doe@example.com
 *               password: Passw0rd*
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     profilePicture:
 *                       type: string
 *                       example: profile-1234567890.jpg
 *       400:
 *         description: Invalid credentials or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *                 error:
 *                   type: string
 *                   example: The user or email does not exist
 *       401:
 *         description: Authentication failed - incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 *                 error:
 *                   type: string
 *                   example: Incorrect password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login failed, server error
 *                 error:
 *                   type: string
 */
router.post(
    "/login",
    loginValidator,
    deleteFileOnError,
    login
)

export default router;
