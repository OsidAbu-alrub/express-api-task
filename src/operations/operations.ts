import {promises} from "fs";
import * as path from "path";

async function readAll<T extends {id:number | string}>(dbPath:string):Promise<T[]>{
    const data = await promises.readFile(path.join(__dirname,"./..",dbPath),"utf-8");
    const dataParsed:T[] = JSON.parse(data);
    return dataParsed;
}

async function read<T extends {id:number | string}>(wantedItem:number|string,dbPath:string):Promise<T> | never{
    const data = await readAll<T>(dbPath);
    const item = data.filter((item)=> item.id == wantedItem)[0] || undefined;
    if(!item) throw new Error(`404 Not Found`);
    return item;
}

async function create<T extends {id:number | string}>(addToDb:T,dbPath:string):Promise<T> | never{
    const data = await readAll<T>(dbPath);
    const item = data.filter((item)=> item.id == addToDb.id)[0] || undefined;
    if(item) throw new Error(`Item with ID ${addToDb.id} already exists`);
    data.push(addToDb);
    await promises.writeFile(path.join(__dirname,"./..",dbPath),JSON.stringify(data));
    return addToDb;
}

async function remove<T extends {id:number | string}>(deleteId:number|string,dbPath:string):Promise<boolean> | never{
    const data = await readAll<T>(dbPath);
    const oldLength = data.length;
    data.forEach((item,index,array)=> {
        if(item.id == deleteId){array.splice(index,1)}
    });
    const newLength = data.length;
    if(oldLength === newLength) throw new Error(`404 Not Found`);
    await promises.writeFile(path.join(__dirname,"./..",dbPath),JSON.stringify(data));
    return true;
}

async function update<T extends {id:number | string}>(itemToUpdate:T,dbPath:string):Promise<T> | never{
    const data = await readAll<T>(dbPath);
    const itemUpdated = data.filter((item)=> {
        if(item.id == itemToUpdate.id)
        {
            const arrayOfKeys = Object.keys(itemToUpdate);
            arrayOfKeys.forEach((key)=>{
                if(key in item && key !== 'id'){
                    (item as any)[key] = (itemToUpdate as any)[key];
                }
            })
            return true;
        }
        return false;
    })[0] || undefined;
    if(!itemUpdated) throw new Error(`404 Not Found`);
    await promises.writeFile(path.join(__dirname,"./..",dbPath),JSON.stringify(data));
    return itemUpdated;
}

function isValid<T>(item:T,values:string[]):item is T{
    return values.every((value)=>value in item);
}

export 
    {
        readAll,
        read,
        create,
        remove,
        update
    };


