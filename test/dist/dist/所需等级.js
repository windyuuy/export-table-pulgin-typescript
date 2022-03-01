"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.所需等级Row = void 0;
var fields = [
    "id",
    "levelMin",
    "levelMax",
];
class 所需等级Row {
    constructor() {
        /**
         * id
         **/
        this.id = 0;
        /**
         * 最小等级
         **/
        this.levelMin = 0;
        /**
         * 最大等级
         **/
        this.levelMax = 0;
    }
}
exports.所需等级Row = 所需等级Row;
let 所需等级 = [];
var rowData = [
    [1001, 1, 2],
    [1002, 2, 3],
];
let tableData = [];
for (let record of rowData) {
    let obj = new 所需等级Row();
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        obj[key] = record[i];
    }
    tableData.push(obj);
}
for (let r of tableData) {
    所需等级.push(r);
}
exports.default = 所需等级;
