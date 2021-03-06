import * as express from "express";
import {PORT} from './config';
// import * as op from './operations/operations';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/category",require("./routes/api/categories"));

app.listen(PORT,()=>console.log("Server Running"));
