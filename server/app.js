require('dotenv').config()
const express = require('express')

const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./database/db')
const router = require('./routes/route')

const app = express()
const port = process.env.PORT || 3000
const url = process.env.MONGO_URI

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1> <a href="/api/v1/products">Product Route</a>')
})

app.use('/api/v1/products',router)

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    connectDB(url)
    .then(()=>console.log(`connected sucessfully and Listening on port ${port}`))
    .catch(((err)=>console.log(err)))
})