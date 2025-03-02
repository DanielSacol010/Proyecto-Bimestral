import { Schema,model } from "mongoose";

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
        default: 0
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    productPicture:{
        type: String,
        default: "product.jpg"
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"],
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

productSchema.methods.toJSON = function(){
    const {_id, ...product} = this.toObject()
    product.pid = _id
    return product
}

export default model("Product", productSchema)