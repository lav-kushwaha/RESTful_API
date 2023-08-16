const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4500;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/RestApi",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connected Successfully...");
})
.catch((err)=>{
    console.log(err);
});


//Creating Schema.
const productSchema = new mongoose.Schema({
        name:String,
        description:String,
        price:Number,
});

//Creating model.
const product = new mongoose.model('Product',productSchema);

app.post('/api/v1/product/new',async(req,res)=>{
    const productModel = await product.create(req.body);
    res.status(200).json({
        success:true,
        productModel
    });
});

//Creating PORT.
app.listen(PORT,()=>{
    console.log(`Server is working on:http://localhost:${PORT}`);
});
