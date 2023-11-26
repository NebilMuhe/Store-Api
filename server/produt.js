require('dotenv').config()
const connectDB = require('./database/db')
const Product = require('./models/productSchema')
const values = require('./products.json')



const create = ()=>{
    connectDB(process.env.MONGO_URI)
    .then(async()=>{
        await Product.create(values)
        console.log("completed")
    })
    .catch((err)=>console.log(err))
}

create()