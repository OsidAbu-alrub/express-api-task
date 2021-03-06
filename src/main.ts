import * as express from "express";
import {PORT,DATA} from './config';
import * as op from './operations/operations';
const app = express();

app.get("/",(req,res)=>{
    console.log("Hello From Console");
    res.send("Hello From Server");
});

app.listen(PORT,()=>console.log("Server Running"));
