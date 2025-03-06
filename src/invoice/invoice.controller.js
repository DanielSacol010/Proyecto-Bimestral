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
            cart: cart._id,
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
        const dir = path.join(path.resolve(), 'invoices');
        
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, fileName);
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        
        doc.fontSize(18).text('INVOICE', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(12)
            .text(`Invoice #: ${invoiceNum}`)
            .text(`Date: ${new Date(invoice.date).toLocaleDateString()}`)
            .text(`Customer: ${usuario.name}`)
            .text(`Email: ${usuario.email}`);
            
        doc.moveDown()
            .text('Products:', { underline: true });
            
        cart.products.forEach((item, i) => {
            doc.text(`${i+1}. ${item.productId.name} - Cant: ${item.quantity} - Q${item.productId.price} - Subtotal: Q${item.subTotal}`);
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