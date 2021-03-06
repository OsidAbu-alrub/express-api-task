"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.remove = exports.create = exports.read = exports.readAll = void 0;
const fs_1 = require("fs");
const path = require("path");
async function readAll(dbPath) {
    const data = await fs_1.promises.readFile(path.join(__dirname, "./..", dbPath), "utf-8");
    const dataParsed = JSON.parse(data);
    return dataParsed;
}
exports.readAll = readAll;
async function read(wantedItem, dbPath) {
    const data = await readAll(dbPath);
    const item = data.filter((item) => item.id == wantedItem)[0] || undefined;
    if (!item)
        throw new Error(`404 Not Found`);
    return item;
}
exports.read = read;
async function create(addToDb, dbPath) {
    const data = await readAll(dbPath);
    const item = data.filter((item) => item.id == addToDb.id)[0] || undefined;
    if (item)
        throw new Error(`Item with ID ${addToDb.id} already exists`);
    data.push(addToDb);
    await fs_1.promises.writeFile(path.join(__dirname, "./..", dbPath), JSON.stringify(data));
    return addToDb;
}
exports.create = create;
async function remove(deleteId, dbPath) {
    const data = await readAll(dbPath);
    const oldLength = data.length;
    data.forEach((item, index, array) => {
        if (item.id == deleteId) {
            array.splice(index, 1);
        }
    });
    const newLength = data.length;
    if (oldLength === newLength)
        throw new Error(`404 Not Found`);
    await fs_1.promises.writeFile(path.join(__dirname, "./..", dbPath), JSON.stringify(data));
    return true;
}
exports.remove = remove;
async function update(itemToUpdate, dbPath) {
    const data = await readAll(dbPath);
    const itemUpdated = data.filter((item) => {
        if (item.id == itemToUpdate.id) {
            const arrayOfKeys = Object.keys(itemToUpdate);
            arrayOfKeys.forEach((key) => {
                if (key in item && key !== 'id') {
                    item[key] = itemToUpdate[key];
                }
            });
            return true;
        }
        return false;
    })[0] || undefined;
    if (!itemUpdated)
        throw new Error(`404 Not Found`);
    await fs_1.promises.writeFile(path.join(__dirname, "./..", dbPath), JSON.stringify(data));
    return itemUpdated;
}
exports.update = update;
function isValid(item, values) {
    return values.every((value) => value in item);
}
