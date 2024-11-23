const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: { type: String },
    price: { type: Number },
    brand : String,
    image : String,
    video : String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('products', mySchema);