import Product from './product.model.js';
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        let productPicture = req.file ? req.file.filename : null;
        data.productPicture = productPicture;

        const product = await Product.create(data);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error creating product",
            error: err.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const [total, products] = await Promise.all([
            Product.countDocuments(),
            Product.find()
                .skip(Number(from))
                .limit(Number(limit))
                .populate("category", "name")
                
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: err.message
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findById(pid).populate("category", "name");

        return res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: err.message
        })
    }
}

export const editProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;


        const editedProduct = await Product.findByIdAndUpdate(pid, data, {new: true} )

        return res.status(200).json({
            message: "Product has been updated",
            editedProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: "Product update failed",
            error: err.message
        });
    }
}

export const updateProductPicture = async (req, res) => {
    try {
        const { pid } = req.params;

        let newProductPicture = req.file ? req.file.filename : null;

        if (!newProductPicture) {
            return res.status(400).json({
                success: false,
                message: "No photo provided",
            });
        }

        const product = await Product.findById(pid);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.productPicture) {
            const oldProductPicturePath = join(__dirname, "../../public/uploads/product-pictures", product.productPicture);
            await fs.unlink(oldProductPicturePath);
        }

        const updatedProduct = await Product.findByIdAndUpdate(pid,{ productPicture: newProductPicture },{ new: true });

        return res.status(200).json({
            success: true,
            message: "Product picture updated successfully",
            updatedProduct
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating product picture",
            error: err.message
        });
    }
};


export const getOutOfStockProducts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const query = { stock: 0 };
        
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate("category", "name")
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching out of stock products",
            error: err.message
        });
    }
}

export const getBestSellingProducts = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        
        const [total, products] = await Promise.all([
            Product.countDocuments(),
            Product.find()
                .sort({ sold: -1 })
                .skip(Number(from))
                .limit(Number(limit))
                .populate("category", "name")
        ]);

        return res.status(200).json({
            success: true,
            message: "Best selling products retrieved successfully",
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching best selling products",
            error: err.message
        });
    }
}




