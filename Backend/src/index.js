import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from './db/dbconnection.js'
import { createIndexIfNotExists } from './elasticsearch/init.js'; // adjust path if needed

dotenv.config({
    path: '../env'
})
connectDB().then(
    ()=>{
        app.on('error',(err)=>{
            console.log("Internal Server Error",err);
            throw err;
        })
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is Listening at port ${process.env.PORT}`);
        })
    }
)
.then(
    await createIndexIfNotExists() // Ensure the index is created
)
.catch(
    (err)=>{
        console.log("Mongodb Connection failed : ",err)
    }
);