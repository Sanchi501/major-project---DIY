const {Schema, model} = require('../connection');

const mySchema = new Schema ({
    name: { type: String, required: true},
    email: {type: String, unique: true},
    password: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = model('users', mySchema);