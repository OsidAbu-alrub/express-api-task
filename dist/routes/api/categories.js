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
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const addedItem = await op.create(data, config_1.DATA);
        res.json(addedItem);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await op.remove(id, config_1.DATA);
        res.json({ message: "item removed" });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name
        };
        const updatedItem = await op.update(data, config_1.DATA);
        res.json(updatedItem);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = router;
