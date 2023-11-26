const Product = require("../models/productSchema")


const getAllProducts = async(req,res)=>{
    console.log(req.query)
    const {feautred,company,name,sort,fields,numericFilters} = req.query
    const query = {}
    
    if(feautred) query.feautred = feautred === 'true'? true:false
    if(company) query.company = company
    if(name) query.name = {$regex:'a',$options:'i'}


      if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "<":"$lt",
            "<=":"$lte",
            "=":"$eq"
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx,
            (match)=>`-${operatorMap[match]}-`)
        const options = ["price","range"]

        filters = filters.split(',').forEach((element)=>{
            const [field,operator,value] = element.split('-')
            if(options.includes(field)) {
                console.log("in");
                query[field] = {[operator]: Number(value)}
            }
        })
        console.log(query)
    }

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

  
    

    const products = await result
    res.status(201).json({products,length:products.length})
}

module.exports = {getAllProducts}