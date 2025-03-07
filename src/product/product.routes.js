import { Router } from "express";
import { createProductValidator, getProductsValidator , getProductValidator, editProductValidator, getOutOfStockProductsValidator, getBestSellingProductsValidator, updateProductPictureValidator, filterProductsValidator, deleteProductValidator } from "../middlewares/product-validators.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { createProduct, getProducts, getProduct, editProduct, getOutOfStockProducts, getBestSellingProducts, updateProductPicture, filterProducts, deleteProduct } from "./product.controller.js";    

const router = Router();

/**
 * @swagger
 * /onlineSales/v1/product/createProduct:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Crear producto
 *     description: Permite la creación de un producto. Requiere rol ADMIN_ROLE.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: Nombre del producto.
 *       - in: formData
 *         name: description
 *         type: string
 *         required: true
 *         description: Descripción del producto.
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *         description: Precio del producto.
 *       - in: formData
 *         name: stock
 *         type: number
 *         required: true
 *         description: Stock del producto.
 *       - in: formData
 *         name: category
 *         type: string
 *         required: true
 *         description: ID de la categoría.
 *       - in: formData
 *         name: productPicture
 *         type: file
 *         required: false
 *         description: Imagen del producto.
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error del servidor.
 */
router.post(
    "/createProduct",
    uploadProductPicture.single("productPicture"),
    createProductValidator,
    createProduct
);

/**
 * @swagger
 * /onlineSales/v1/product/getProducts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Obtener productos
 *     description: Retorna la lista de productos. Requiere rol ADMIN_ROLE o CLIENT_ROLE.
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Límite de resultados.
 *       - in: query
 *         name: from
 *         type: number
 *         required: false
 *         description: Índice de inicio.
 *     responses:
 *       200:
 *         description: Lista de productos.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 */
router.get(
    "/getProducts",
    getProductsValidator,
    getProducts
);

/**
 * @swagger
 * /onlineSales/v1/product/getProduct/{pid}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Obtener producto por ID
 *     description: Retorna un producto específico. Requiere rol ADMIN_ROLE.
 *     parameters:
 *       - in: path
 *         name: pid
 *         type: string
 *         required: true
 *         description: ID del producto.
 *     responses:
 *       200:
 *         description: Producto obtenido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get(
    "/getProduct/:pid",
    getProductValidator,
    getProduct
);

/**
 * @swagger
 * /onlineSales/v1/product/editProductById/{pid}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Editar producto
 *     description: Actualiza la información del producto. Requiere rol ADMIN_ROLE.
 *     parameters:
 *       - in: path
 *         name: pid
 *         type: string
 *         required: true
 *         description: ID del producto.
 *       - in: body
 *         name: product
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             stock:
 *               type: number
 *             category:
 *               type: string
 *         description: Datos del producto a actualizar.
 *     responses:
 *       200:
 *         description: Producto actualizado.
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error del servidor.
 */
router.put(
    "/editProductById/:pid",
    editProductValidator,
    editProduct
);

/**
 * @swagger
 * /onlineSales/v1/product/updateProductPicture/{pid}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Actualizar imagen del producto
 *     description: Actualiza la imagen del producto. Requiere rol ADMIN_ROLE.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: pid
 *         type: string
 *         required: true
 *         description: ID del producto.
 *       - in: formData
 *         name: newProductPicture
 *         type: file
 *         required: true
 *         description: Nueva imagen del producto.
 *     responses:
 *       200:
 *         description: Imagen actualizada.
 *       400:
 *         description: Error en el archivo o datos.
 *       500:
 *         description: Error del servidor.
 */
router.patch(
    "/updateProductPicture/:pid",
    updateProductPictureValidator,
    uploadProductPicture.single("newProductPicture"),
    updateProductPicture
);

/**
 * @swagger
 * /onlineSales/v1/product/getOutOfStockProducts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Productos sin stock
 *     description: Retorna productos sin stock. Requiere rol ADMIN_ROLE.
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Límite de resultados.
 *       - in: query
 *         name: from
 *         type: number
 *         required: false
 *         description: Índice de inicio.
 *     responses:
 *       200:
 *         description: Lista de productos sin stock.
 *       500:
 *         description: Error del servidor.
 */
router.get(
    "/getOutOfStockProducts",
    getOutOfStockProductsValidator,
    getOutOfStockProducts
);

/**
 * @swagger
 * /onlineSales/v1/product/getBestSellingProducts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Productos más vendidos
 *     description: Retorna los productos más vendidos. Requiere rol ADMIN_ROLE.
 *     parameters:
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Límite de resultados.
 *       - in: query
 *         name: from
 *         type: number
 *         required: false
 *         description: Índice de inicio.
 *     responses:
 *       200:
 *         description: Lista de productos destacados.
 *       500:
 *         description: Error del servidor.
 */
router.get(
    "/getBestSellingProducts",
    getBestSellingProductsValidator,
    getBestSellingProducts
);

/**
 * @swagger
 * /onlineSales/v1/product/filterProducts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Filtrar productos
 *     description: Filtra productos por nombre, categoría u orden de ventas. Requiere rol ADMIN_ROLE o CLIENT_ROLE.
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *         required: false
 *         description: Nombre del producto.
 *       - in: query
 *         name: category
 *         type: string
 *         required: false
 *         description: ID de la categoría.
 *       - in: query
 *         name: mostSold
 *         type: string
 *         required: false
 *         description: Flag para ordenar por cantidad vendida.
 *     responses:
 *       200:
 *         description: Lista de productos filtrados.
 *       500:
 *         description: Error del servidor.
 */
router.get(
    "/filterProducts",
    filterProductsValidator,
    filterProducts
);

/**
 * @swagger
 * /onlineSales/v1/product/deleteProductById/{pid}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Product
 *     summary: Eliminar producto
 *     description: "Marca el producto como eliminado (status: false) por ID. Requiere rol ADMIN_ROLE."
 *     parameters:
 *       - in: path
 *         name: pid
 *         type: string
 *         required: true
 *         description: ID del producto.
 *     responses:
 *       200:
 *         description: Producto eliminado.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.delete(
    "/deleteProductById/:pid",
    deleteProductValidator,
    deleteProduct
);

export default router;