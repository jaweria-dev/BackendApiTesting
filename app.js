require("dotenv").config();

const express = require('express');
const app = express();
const Port = process.env.Port || 5000;
const product_routes = require("./routes/product")
const connectDb = require("./db/connect")


app.get('/', (req,res)=>{
 res.send(" This is thappa Home PAGE")
})
// middleware or to set routes
app.use("/api/products", product_routes)

// app.listen(Port, async()=>{

//     await connectDb(process.env.MONGODB_URL)


//     console.log(`${Port} is connected`);
    
// })

const start = async () =>{
    
    try{
        await connectDb(process.env.MONGODB_URL)
   
    app.listen(Port, ()=>{
         console.log(`${Port} IS CONNECTED`);
        })
    }catch(error) {
        console.log(error);
    }
}

start()

