// import express
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const productRouter =  require('./routers/productRouter');
const reviewRouter = require('./routers/reviewRouter');
const orderRouter =  require('./routers/orderRouter');


// initialize expresses
const app = express();

const PORT = 5000;

// middleware

app.use(cors({
    origin : ['http://localhost:3000'],
}));
app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/review',reviewRouter);
app.use('/order',orderRouter);
app.use('/order',orderRouter);

app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req,res) => {
    res.send('response from add');
});

// getall
app.get('/getall', (req,res) => {
    res.send('response from getall');
});

// delete
app.get('/delete', (req,res) => {
    res.send('response from delete');
});

// getbyid
app.get('/getbyid', (req,res) => {
    res.send('response from getbyid');
});

app.listen(PORT, () => {console.log('server started');
});