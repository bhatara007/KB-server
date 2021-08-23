const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    images: {
        type: Array
    },
    desc: {
        type: String
    },
    available: {
        type: Boolean
    },
    quantity: {
        type: Number
    },
}, {
    collection: "products"
})

module.exports = mongoose.model('Product', productSchema);

