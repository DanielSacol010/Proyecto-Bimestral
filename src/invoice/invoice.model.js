import {Schema, model} from "mongoose";

const invoiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Invoice', invoiceSchema)