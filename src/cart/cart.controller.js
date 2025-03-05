import Cart from "./cart.model.js";
import Product from "../product/product.model.js";


export const addToCart = async (req, res) => {
    try {
        const {usuario} = req;
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({userId: usuario._id});
        if(!cart) {
            cart = new Cart({
                userId: usuario._id, 
                products: []
            });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ 
                success: false,
                message: "Product not found" 
            });
        }
        if(product.stock === 0) {
            return res.status(400).json({
                success: false,
                message: "Product out of stock"
            });
        }
        const productIndex = cart.products.findIndex(product => product.productId.toString() == productId.toString());
        let currentQuantity = 0;
        if(productIndex > -1) {
            currentQuantity = cart.products[productIndex].quantity;
        }
        if (currentQuantity + parseInt(quantity) > product.stock) {
            return res.status(400).json({
                success: false,
                message: "There are no sufficient units of this product"
            });
        }
        if(productIndex > -1) {
            cart.products[productIndex].quantity += parseInt(quantity);
            cart.products[productIndex].subTotal += (parseInt(quantity) * product.price);
        } else {
            cart.products.push({
                productId,
                quantity: parseInt(quantity),
                subTotal: parseInt(quantity) * product.price
            });
        }
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: cart
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: err.message
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const { usuario } = req;
        const cart = await Cart.findOne({ userId: usuario._id })
            .populate("products.productId", "name price");
        if (!cart) {
            return res.status(400).json({ 
                success: false, 
                message: "Cart not found" 
            });
        }
        let total = 0;
        cart.products.forEach(prod => {
            total += prod.subTotal;
        });
        res.status(200).json({
            success: true,
            data: {
                products: cart.products,
                Total: total
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error getting cart",
            error: err.message
        });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { usuario } = req;
        const { productId } = req.params;
        const cart = await Cart.findOne({ userId: usuario._id });
        if (!cart) {
            return res.status(400).json({ 
                success: false, 
                message: "Cart not found" 
            });
        }
        const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Product not in cart"
            });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Product deleted from cart successfully",
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting product from cart",
            error: err.message
        });
    }
}