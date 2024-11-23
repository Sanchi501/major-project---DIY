const mongoose = require('mongoose');

const url = "mongodb+srv://kumarisanchi71:1234@cluster0.edkub.mongodb.net/diy?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
    .then((result) => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;