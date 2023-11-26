const Product = require("../models/productSchema")


const getAllProducts = async(req,res)=>{
    console.log(req.query)
    const {feautred,company,name,sort,fields,numericFilters} = req.query
    const query = {}
    
    if(feautred) query.feautred = feautred === 'true'? true:false
    if(company) query.company = company
    if(name) query.name = {$regex:'a',$options:'i'}
    let result = Product.find(query)

    if(sort) {
        const sortQuery =  sort.split(',').join(" ")
        console.log(sortQuery)
        result = result.sort(sortQuery)
    }
    
    if(fields) {
        const fieldsQuery = fields.split(',').join(' ')
        console.log(fieldsQuery)
        result = result.select(fieldsQuery)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)

    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "<":"$lt",
            "<=":"$lte",
            "=":"$eq"
        }
        console.log(numericFilters)
    }
    

    const products = await result
    res.status(201).json({products,length:products.length})
}

module.exports = {getAllProducts}