import { Router } from "express";
import { createProductValidator, getProductsValidator , getProductValidator} from "../middlewares/product-validators.js";
import { uploadProductPicture } from "../middlewares/multer-uploads.js";
import { createProduct, getProducts, getProduct} from "./product.controller.js";    

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

export default router;