const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users' },
    product: { type: Types.ObjectId,ref:"products"},
    totalamount: { type: Number },
    paymentdetails: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('reviews', mySchema);