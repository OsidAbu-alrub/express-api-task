"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
const app = express();
app.get("/", (req, res) => {
    console.log("Hello From Console");
    res.send("Hello From Server");
});
app.listen(config_1.default, () => console.log("Server Running"));
