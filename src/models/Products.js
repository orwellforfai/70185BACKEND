import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    "title":{type: String, require: true, max: 100},
    "description": {type: String, require: true, max: 100},
    "code": {type: String, require: true, max: 100},
    "price": {type: Number, require: true},
    "status": {type: Boolean, require: true},
    "stock": {type: Number, require: true},
    "category": {type: String, require: true, max: 100},
    "thumbnail":{type: String, require: true, max: 100},
})
const Product = mongoose.model('Product', ProductSchema);


export default Product;