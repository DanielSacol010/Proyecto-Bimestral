import Invoice from "./invoice.model.js";
import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const completePurchase = async (req, res) => {
    try {
        const { usuario } = req;
        
        const cart = await Cart.findOne({ userId: usuario._id })
            .populate("products.productId", "name price stock");
            
        if (!cart || cart.products.length === 0) {
                return res.status(400).json({ 
                success: false, 
                message: "Cart is empty or not found" 
            });
        }
        let total = 0;
        cart.products.forEach(prod => {
            total += prod.subTotal;
        });

        const invoice = new Invoice({
            user: usuario._id,
            date: new Date(),
            products: cart.products.map(item => ({
                productId: item.productId._id,
                name: item.productId.name, 
                price: item.productId.price,
                quantity: item.quantity,
                subTotal: item.subTotal
            })),
            total: total
        });
        
        await invoice.save();
        
        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: { 
                    stock: -item.quantity, 
                    sold: item.quantity
                }
            });
        }

        const invoiceNum = invoice._id.toString();
        const fileName = `invoice-${invoiceNum}.pdf`;
        
        const dir = path.join(path.resolve(), 'public', 'uploads', 'invoices');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, fileName);
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        
        doc.fontSize(18).text("INVOICE", { align: "center" });
        doc.moveDown();
        
        doc.fontSize(12)
            .text(`Invoice #: ${invoiceNum}`)
            .text(`Date: ${new Date(invoice.date).toLocaleDateString()}`)
            .text(`Customer: ${usuario.name}`)
            .text(`Email: ${usuario.email}`);
            
        doc.moveDown()
            .text('Products:', { underline: true });
            
        invoice.products.forEach((item, i) => {
            doc.text(`${i+1}. ${item.name} - Cant: ${item.quantity} - Q${item.price} - Subtotal: Q${item.subTotal}`);
        });
        
        doc.moveDown()
            .fontSize(14)
            .text(`Total: Q${total.toFixed(2)}`, { align: 'right' });
            
        doc.end();
        
        cart.products = [];
        await cart.save();
        
        res.status(200).json({
            success: true,
            message: "Purchase completed successfully",
           invoice: invoice
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error completing purchase",
            error: err.message
        });
    }
}

export const getPurchases = async (req, res) => {
    try {
        const { usuario } = req;
        const invoices = await Invoice.find({ user: usuario._id });

        if (!invoices || invoices.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No purchases found" 
            });
        }
        res.status(200).json({
            success: true,
            invoices: invoices
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error getting purchases",
            error: err.message
        });
    }
}

export const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(400).json({
                success: false,
                message: "Invoice not found"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        const invoiceProduct = invoice.products.find(p => p.productId.toString() === productId);
        if (!invoiceProduct) {
            return res.status(40).json({
                success: false,
                message: "Product not found in invoice"
            });
        }

        const quantityDifference = quantity - invoiceProduct.quantity;
        if (product.stock < quantityDifference) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        invoiceProduct.quantity = quantity;
        invoiceProduct.subTotal = quantity * invoiceProduct.price;
        invoiceProduct.name = product.name;
        invoice.total = invoice.products.reduce((acc, prod) => acc + prod.subTotal, 0);

        await invoice.save();

        await Product.findByIdAndUpdate(productId, {
            $inc: { 
                stock: -quantityDifference, 
                sold: quantityDifference
            }
        });

        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            invoice: invoice
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating invoice",
            error: err.message
        });
    }
}

export const getInvoiceByUser = async (req, res) => {
    try{
        const {limit = 10, from = 0} = req.query;
        const {uid} = req.params;
        const [total, invoices] = await Promise.all([
            Invoice.countDocuments({user: uid}),
            Invoice.find({user: uid})
                .skip(Number(from))
                .limit(Number(limit))
                .populate("products.productId", "name price")
        ]);

        return res.status(200).json({
            success: true,
            total,
            invoices
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error fetching invoices",
            error: err.message
        });
    }
}




