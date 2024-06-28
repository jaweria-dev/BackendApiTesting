const Product = require("../models/product")

const getALLProducts = async(req, res) =>{
    
   const { company, name, featured, sort, select } = req.query;
   const queryObject = {};


   if (company) {
    queryObject.company = company;
    // console.log(queryObject.company);
   }

   if (featured) {
    queryObject.featured = featured;
   }

   if (name) {
    queryObject.name = { $regex: name, $options: "i" };
   }

   let apiData = Product.find(queryObject);

   if (sort) {
    // let sortFix = sort.replace(",", " ");
    let sortFix = sort.split(",").join(" ");
    // queryObject.sort = sortFix;
    apiData = apiData.sort(sortFix)
   }

//    select= name,company;
if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ")
    apiData = apiData.select(selectFix)
   }

   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;

   let skip = (page -1) * limit;

//    page = 2;
//    limit = 3;
//    skip = 1 * 3
// means 3 skip kar k data dykhao

   apiData = apiData.skip(skip).limit(limit)


   console.log(queryObject);

   const Products = await apiData
    res.status(200).json({ Products ,nbHits: Products.length })
}

const getALLProductstesting = async(req, res) =>{
    // const myData = await Product.find( req.query ).sort("-name")
    // const myData = await Product.find( req.query ).sort("name -price");
    // sort= name,price;
    // const myData = await Product.find( req.query ).select("name company");
    const myData = await Product.find( req.query ).skip(2);
    
    res.status(200).json({ myData })
}

// const getALLProductstesting = async(req, res) =>{
//     res.status(200).json({msg: "I am get All Testing products"})
// }

module.exports = { getALLProducts, getALLProductstesting };