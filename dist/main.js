"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
// import * as op from './operations/operations';
const app = express();
app.use("/api/category", require("./routes/api/categories"));
app.listen(config_1.PORT, () => console.log("Server Running"));
