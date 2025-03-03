import { Router } from "express";
import { createProductValidator, getProductsValidator , getProductValidator, editProductValidator, getOutOfStockProductsValidator, getBestSellingProductsValidator, updateProductPictureValidator } from "../middlewares/product-validators.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { createProduct, getProducts, getProduct, editProduct, getOutOfStockProducts, getBestSellingProducts, updateProductPicture } from "./product.controller.js";    

const router = Router();

router.post(
    "/createProduct",
    uploadProductPicture.single("productPicture"),
    createProductValidator,
    createProduct

)

router.get(
    "/getProducts",
    getProductsValidator,
    getProducts
)

router.get(
    "/getProduct/:pid",
    getProductValidator,
    getProduct
)

router.put(
    "/editProductById/:pid",
    editProductValidator,
    editProduct
)

router.patch(
    "/updateProductPicture/:pid",
    updateProductPictureValidator,
    uploadProductPicture.single("newProductPicture"),
    updateProductPicture
);

router.get(
    "/getOutOfStockProducts",
    getOutOfStockProductsValidator,
    getOutOfStockProducts
)

router.get(
    "/getBestSellingProducts",
    getBestSellingProductsValidator,
    getBestSellingProducts
)



export default router;