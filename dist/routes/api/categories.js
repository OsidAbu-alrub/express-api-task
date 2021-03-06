"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./../../config");
const op = require("./../../operations/operations");
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const data = await op.readAll(config_1.DATA);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ "message": err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const wantedItem = req.params.id;
        const data = await op.read(wantedItem, config_1.DATA);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ "message": err.message });
    }
});
module.exports = router;