"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.任务触发条件配表Row = void 0;
const ____1 = __importDefault(require("./\u6240\u9700\u9053\u5177"));
const ____2 = __importDefault(require("./\u6240\u9700\u7B49\u7EA7"));
const ____3 = __importDefault(require("./\u6240\u9700\u65F6\u6BB5"));
var fields = [
    "id",
    "taskId",
    "cond1",
    "para1",
    "cond2",
    "para2",
    "cond3",
    "para3",
];
class 任务触发条件配表Row {
    constructor() {
        /**
         * id
         **/
        this.id = 0;
        /**
         * 任务ID
         **/
        this.taskId = 0;
        /**
         * 条件1
wilwin wilwin:
q3wrjhqihruq
]qwklhqwlkqw
qweklq
         **/
        this.cond1 = "";
        /**
         * 条件1参数
         **/
        this.para1 = 0;
        this._fkpara1 = undefined;
        /**
         * 条件2
         **/
        this.cond2 = "";
        /**
         * 条件2参数
         **/
        this.para2 = 0;
        this._fkpara2 = undefined;
        /**
         * 条件3
         **/
        this.cond3 = "";
        /**
         * 条件3参数
         **/
        this.para3 = 0;
        this._fkpara3 = undefined;
    }
    /**
     * 条件1参数
     **/
    get para1Data() {
        if (this._fkpara1 === undefined) {
            this._fkpara1 = ____1.default.find(a => a.id == this.para1);
        }
        return this._fkpara1;
    }
    /**
     * 条件2参数
     **/
    get para2Data() {
        if (this._fkpara2 === undefined) {
            this._fkpara2 = ____2.default.find(a => a.id == this.para2);
        }
        return this._fkpara2;
    }
    /**
     * 条件3参数
     **/
    get para3Data() {
        if (this._fkpara3 === undefined) {
            this._fkpara3 = ____3.default.find(a => a.id == this.para3);
        }
        return this._fkpara3;
    }
}
exports.任务触发条件配表Row = 任务触发条件配表Row;
let 任务触发条件配表 = [];
var rowData = [
    [1, 1001, "道具", 1001, "等级", 1001, "时段", 1001],
    [2, 1002, "道具", 1001, "时段", 1002, "等级", 1002],
];
let tableData = [];
for (let record of rowData) {
    let obj = new 任务触发条件配表Row();
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        obj[key] = record[i];
    }
    tableData.push(obj);
}
for (let r of tableData) {
    任务触发条件配表.push(r);
}
exports.default = 任务触发条件配表;
