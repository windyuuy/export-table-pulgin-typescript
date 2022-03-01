"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneConfigRow = void 0;
var fields = [
    "uid",
    "sceneId",
    "outingBaseGold",
    "a",
    "sd",
    "jfew",
    "wef",
];
class SceneConfigRow {
    constructor() {
        /**
         * uid
         **/
        this.uid = 0;
        /**
         * 场景名
         **/
        this.sceneId = "";
        /**
         * 出行基础金币收益
         **/
        this.outingBaseGold = 0;
        /**
         * xx
         **/
        this.a = [];
        /**
         * dfg
         **/
        this.sd = [];
        /**
         * wefw
         **/
        this.jfew = null;
        /**
         * fwf
         **/
        this.wef = [];
    }
}
exports.SceneConfigRow = SceneConfigRow;
let SceneConfig = [];
var rowData = [
    [1, "第1章 格莫拉城", 1000, [1000], ["wkjf"], {}, [{}]],
    [2, "第2章 纳皮尔乐园", 1200, [1200, 223], ["ww;fjj"], { "wjf": 32 }, [{ "wjf": 32 }]],
];
let tableData = [];
for (let record of rowData) {
    let obj = new SceneConfigRow();
    for (let i = 0; i < fields.length; i++) {
        let key = fields[i];
        obj[key] = record[i];
    }
    tableData.push(obj);
}
for (let r of tableData) {
    SceneConfig.push(r);
}
exports.default = SceneConfig;
