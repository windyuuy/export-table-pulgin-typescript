"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportTSPlugin = exports.export_stuff = exports.iff = exports.Cond = void 0;
const export_table_lib_1 = require("export-table-lib");
const fs = __importStar(require("fs-extra"));
class Cond {
    constructor() {
        this.lines = [];
        this.finished = false;
    }
    if(cond, call) {
        if (this.finished) {
            return;
        }
        if (cond) {
            this.finished = true;
            let str = call();
            this.lines.push(str);
        }
        return this;
    }
    elseif(cond, call) {
        if (this.finished) {
            return;
        }
        if (cond) {
            this.finished = true;
            let str = call();
            this.lines.push(str);
        }
        return this;
    }
    else(call) {
        if (this.finished) {
            return;
        }
        this.finished = true;
        let str = call();
        this.lines.push(str);
        return this;
    }
    toString() {
        return this.lines.map(l => {
            if (l.startsWith("\n")) {
                l = l.substring(1);
            }
            if (l.endsWith("\n")) {
                l = l.substring(0, l.length - 1);
            }
            return l;
        }).join("");
    }
}
exports.Cond = Cond;
function iff(cond, call) {
    return new Cond().if(cond, call);
}
exports.iff = iff;
function export_stuff(paras) {
    var _a;
    let { datas, fields, name, objects, tables, } = paras;
    let firstLetterUpper = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    let firstLetterLower = function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    };
    let convMemberName = firstLetterUpper;
    let convVarName = firstLetterLower;
    let RowClass = firstLetterUpper(name) + "Row";
    let initFunc = name + "Init";
    let mapfield = fields.find(a => a.type == "key"); //如果是map，则生成对应的map
    let mapName = name + "Map";
    let getFieldType = function (f) {
        let t = f.type;
        if (t == "object") {
            return "object";
        }
        else if (t == "object[]") {
            return "object[]";
        }
        else if (t == "number") {
            return "number";
        }
        else if (t == "number[]") {
            return "number[]";
        }
        else if (t == "uid") {
            return "number";
        }
        else if (t == "bool") {
            return "boolean";
        }
        else if (t == "bool[]") {
            return "boolean[]";
        }
        else if (t == "string") {
            return "string";
        }
        else if (t == "string[]") {
            return "string[]";
        }
        else if (t == "fk") {
            return "number";
        }
        else if (t == "fk[]") {
            return "number[]";
        }
        else if (t == "any") {
            return "any";
        }
        else if (t == "key") {
            return "string";
        }
        else {
            throw new Error(`invalid type ${f.name}:<unkown>`);
        }
        return t;
    };
    const genValue = (value, f) => {
        let t = f.type;
        if (t == "object") {
            return JSON.stringify(value);
        }
        else if (t == "object[]") {
            return JSON.stringify(value);
        }
        else if (t == "number") {
            return `${value}`;
        }
        else if (t == "number[]") {
            let values = value;
            return `[${values.join(", ")}]`;
        }
        else if (t == "uid") {
            return `${value}`;
        }
        else if (t == "bool") {
            return `${value}`;
        }
        else if (t == "bool[]") {
            let values = value;
            return `[${values.join(", ")}]`;
        }
        else if (t == "string") {
            return `"${value}"`;
        }
        else if (t == "string[]") {
            let values = value;
            return `[${values.map(v => `"${v}"`).join(", ")}]`;
        }
        else if (t == "fk") {
            return `${value}`;
        }
        else if (t == "fk[]") {
            let values = value;
            return `[${values.join(", ")}]`;
        }
        else if (t == "any") {
            JSON.stringify(value);
        }
        else if (t == "key") {
            return `${value}`;
        }
        throw new Error(`invalid type ${f.name}:<unkown>`);
    };
    const getTitle = (v) => {
        return v.describe.split("\n")[0];
    };
    const getDescripts = (v) => {
        return v.describe.split("\n");
    };
    var xxteaKey = "AMhGbf0cnlMCWWviP" + name + "GOK+GK*--s8V2wUd";
    var keyOffset = "fmrarm";
    var getFieldName = function (n) {
        if (n == "object" || n == "any") {
            return n + "?";
        }
        return n;
    };
    var getFieldDefault = function (t) {
        if (t == "any") {
            return "undefined";
        }
        else if (t == "uid") {
            return 0;
        }
        else if (t == "number") {
            return 0;
        }
        else if (t == "bool") {
            return "false";
        }
        else if (t == "string") {
            return "\"\"";
        }
        else if (t == "string*") {
            return "\"\"";
        }
        else if (t == "object") {
            return "null as any";
        }
        else if (t == "fk") {
            return 0;
        }
        else if (t == "key") {
            return "\"\"";
        }
        else if (t.endsWith("[]")) {
            return "[]";
        }
        return "undefined";
    };
    var getFkFieldType = function (field) {
        return tables.find(a => a.name == field.fkTableName).fields.find(a => a.name == field.fkFieldName).type;
    };
    let mainField = (_a = fields.find(f => f.type == "uid")) !== null && _a !== void 0 ? _a : fields[0];
    let temp = `
${(0, export_table_lib_1.foreach)(fields, f => `
${iff((f.type == "fk" || f.type == "fk[]") && f.fkTableName != name, () => `
import ${f.fkTableName}, { ${f.fkTableName}Row } from "./${f.fkTableName}"
`)}
`).trim()}

type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
${(0, export_table_lib_1.foreach)(fields, f => `	"${f.name}",`)}
]

export class ${RowClass}{
	
${(0, export_table_lib_1.foreach)(fields, f => `
        /**
         * ${f.describe}
         **/
        ${getFieldName(f.name)}:${getFieldType(f)} = ${getFieldDefault(f.type)}

${iff(f.type == "fk", () => `
${iff(getFkFieldType(f).toLowerCase() != "uid", () => `
        protected _fk${f.name}?:${f.fkTableName}Row[]=undefined
        /**
         * ${f.describe}
         **/
        get ${f.name}DataList(){
            if(this._fk${f.name}===undefined){
                if(!this.${f.name}){
                    this._fk${f.name} = [];
                }else{
                    this._fk${f.name}=${f.fkTableName}.filter(a=>a.${f.fkFieldName}!=null && this.${f.name}==a.${f.fkFieldName});
                }
            }
            return this._fk${f.name};
        }
        }
`).else(() => `
        protected _fk${f.name}?:${f.fkTableName}Row=undefined
        /**
         * ${f.describe}
         **/
        get ${f.name}Data(){
            if(this._fk${f.name}===undefined){
                this._fk${f.name}=${f.fkTableName}.find(a=>a.${f.fkFieldName}==this.${f.name});
            }
            return this._fk${f.name};
        }
`)}
`)}
${iff(f.type == "fk[]", () => `
        protected _fk${f.name}?:${f.fkTableName}Row[]=undefined
        /**
         * ${f.describe}
         **/
        get ${f.name}DataList(){
            if(this._fk${f.name}===undefined){
                if(!this.${f.name}){
                    this._fk${f.name} = [];
                }else{
                    this._fk${f.name}=${f.fkTableName}.filter(a=>a.${f.fkFieldName}!=null && this.${f.name}!.indexOf(a.${f.fkFieldName})!=-1);
                }
            }
            return this._fk${f.name};
        }
`)}
`)}
}

let ${name}:${RowClass} []=[];

var rowData=
[
${(0, export_table_lib_1.foreach)(datas, d => `
	${JSON.stringify(d)},
`)}
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new ${RowClass} () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}

${iff(mapfield, () => `
export let ${mapName}:{
	${(0, export_table_lib_1.foreach)(objects, o => `
    /** ${JSON.stringify(o)} */
    ${o[mapfield.name]}:${RowClass}
	`)}
}={} as any`)}

for(let r of tableData){
    ${name} .push(r);
	${iff(mapfield, () => `
    (${mapName} as any)[r. ${mapfield}.name ] =r;
	`)}
}

export default ${name}
`;
    return temp;
}
exports.export_stuff = export_stuff;
class ExportTSPlugin extends export_table_lib_1.PluginBase {
    constructor() {
        super(...arguments);
        this.name = "typescript";
        this.tags = ["ts"];
    }
    handleSheet(paras) {
        let content = export_stuff(paras);
        if (content != null) {
            let savePath = new export_table_lib_1.OutFilePath(paras.outPath, paras.table.name, ".ts").fullPath;
            fs.outputFileSync(savePath, content, "utf-8");
        }
        return content;
    }
}
exports.ExportTSPlugin = ExportTSPlugin;
