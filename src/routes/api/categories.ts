import * as express from "express";
import {DATA} from './../../config';
import * as op from './../../operations/operations';
import {ICategory} from './../../Models/Categories.Model';

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const data = await op.readAll<ICategory>(DATA);
        res.json(data);
    }   
    catch(err){
        res.status(400).json({"message":err.message});
    } 
    
});

router.get("/:id",async (req,res)=>{
    try{
        const wantedItem = req.params.id; 
        const data = await op.read<ICategory>(wantedItem,DATA);
        res.json(data);
    }   
    catch(err){
        res.status(400).json({"message":err.message});
    } 
    
});

module.exports = router;