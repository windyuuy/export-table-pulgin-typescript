"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.所需道具Row = void 0;
var fields = [
    "id",
    "type",
    "count",
];
class 所需道具Row {
    constructor() {
        /**
         * id
         **/
        this.id = 0;
        /**
         * 种类
         **/
        this.type = "";
        /**
         * 数量
         **/
        this.count = 0;
    }
}
exports.所需道具Row = 所需道具Row;
let 所需道具 = [];
var rowData = [
    [1001, "redstone", 1],
    [1002, "apple", 2],
    [1003, "apple", 3],
];
let tableData = [];
for (let record of rowData) {
    let obj = new 所需道具Row();
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        obj[key] = record[i];
    }
    tableData.push(obj);
}
for (let r of tableData) {
    所需道具.push(r);
}
exports.default = 所需道具;
