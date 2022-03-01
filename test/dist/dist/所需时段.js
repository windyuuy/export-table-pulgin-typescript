"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.所需时段Row = void 0;
var fields = [
    "id",
    "start1",
    "end1",
    "start2",
    "end2",
];
class 所需时段Row {
    constructor() {
        /**
         * id
         **/
        this.id = 0;
        /**
         * 开始时段1
         **/
        this.start1 = 0;
        /**
         * 结束时段1
         **/
        this.end1 = 0;
        /**
         * 开始时段2
         **/
        this.start2 = 0;
        /**
         * 结束时段2
         **/
        this.end2 = 0;
    }
}
exports.所需时段Row = 所需时段Row;
let 所需时段 = [];
var rowData = [
    [1001, 1, 2, 3, 4],
    [1002, 1, 2, 3, 4],
];
let tableData = [];
for (let record of rowData) {
    let obj = new 所需时段Row();
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        obj[key] = record[i];
    }
    tableData.push(obj);
}
for (let r of tableData) {
    所需时段.push(r);
}
exports.default = 所需时段;
