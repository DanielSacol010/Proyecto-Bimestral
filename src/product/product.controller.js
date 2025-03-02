import Product from './product.model.js';


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
