const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4500;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Connecting Nodejs with MongoDB.
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

//Create Product.
app.post('/api/v1/product/new',async(req,res)=>{
    const productModel = await product.create(req.body);
    res.status(201).json({
        success:true,
        productModel 
    });
});

//Read Products.
app.get("/api/v1/products",async(req,res)=>{
    const products = await product.find();
    res.status(200).json({
        success:true,
        products,
        count:products.length
    })
});


//Update Products.
app.put("/api/v1/product/:id",async(req,res)=>{

    //Finding the document by id and updating it's values to req body data.
    let updProducts = await product.findById(req.params.id);
    if(!updProducts){
        return res.status(500).json({
            success:false,
            message:"No such a record found"
        }); 
    }
     updProducts = await product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            useFindAndModify:false,
            runValidators:true
        });
     res.status(200).json({
        success:true,
        updProducts
    });
});


//Delete Products.
app.delete("/api/v1/product/:id",async(req,res)=>{
    let deleteProduct = await product.findById(req.params.id);
    if(!deleteProduct){
        return res.status(200).json({
            success:true,
            message : "Product Not Found."
        })
    }
    deleteProduct = await product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Deleted Successfully!"
    })
});



//Creating PORT.
app.listen(PORT,()=>{
    console.log(`Server is working on:http://localhost:${PORT}`);
});
