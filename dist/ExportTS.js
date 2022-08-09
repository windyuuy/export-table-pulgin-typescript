"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportTSPlugin = exports.export_stuff = void 0;
const chalk_1 = __importDefault(require("chalk"));
const export_table_lib_1 = require("export-table-lib");
const fs = __importStar(require("fs-extra"));
function export_stuff(paras) {
    var _a;
    let { datas, fields, name, objects, tables, table, } = paras;
    let RowClass = (0, export_table_lib_1.makeFirstLetterUpper)(name) + "Row";
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
        else if (t == "number" || t == "int" || t == "long") {
            return "number";
        }
        else if (t == "number[]" || t == "int[]" || t == "long[]") {
            return "number[]";
        }
        else if (t == "uid") {
            return "uid";
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
            let ffk = table.getFKField(f);
            let fkType = getFieldType(ffk);
            return fkType;
            // return "number";
        }
        else if (t == "fk[]") {
            let ffk = table.getFKField(f);
            let fkType = getFieldType(ffk);
            if (typeof (fkType) == "string") {
                if (fkType.match(/\w+/)) {
                    return `${fkType}[]`;
                }
            }
            return `(${fkType})[]`;
            // return "number[]";
        }
        else if (t == "any") {
            return "any";
        }
        else if (t == "key") {
            return "string";
        }
        else {
            console.error(chalk_1.default.red(`invalid type ${f.name}:<unkown>`));
            return "never";
        }
        return t;
    };
    let getFieldName = function (n) {
        if (n == "object" || n == "any") {
            return n + "?";
        }
        return n;
    };
    let getFieldDefault = function (f) {
        let t = f.type;
        if (t == "any") {
            return "undefined";
        }
        else if (t == "uid") {
            return 0;
        }
        else if (t == "number" || t == "int" || t == "long") {
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
            // return 0;
            let ffk = table.getFKField(f);
            let defaultValue = getFieldDefault(ffk);
            return defaultValue;
        }
        else if (t == "key") {
            return "\"\"";
        }
        else if (t.endsWith("[]")) {
            return "[]";
        }
        return "undefined";
    };
    let getFkFieldType = function (field) {
        return tables.find(a => a.name == field.fkTableName).fields.find(a => a.name == field.fkFieldName).type;
    };
    let formatDescribe = function (field, tabCount) {
        let tabs = "    ".repeat(tabCount);
        let lines = `${field.describe}`.split("\n").map(l => `${tabs + " * " + l}`);
        let line = tabs + "/**\n" + lines.join("\n") + "\n" + tabs + " **/";
        return line;
    };
    let mainField = (_a = fields.find(f => f.type == "uid")) !== null && _a !== void 0 ? _a : fields[0];
    let temp = `
${(0, export_table_lib_1.foreach)(fields, f => `
${(0, export_table_lib_1.iff)((f.type == "fk" || f.type == "fk[]") && f.fkTableName != name, () => `
import ${f.fkTableName}, { ${f.fkTableName}Row } from "./${f.fkTableName}"
`)}
`).trim()}

type uid=number;
type key=string;
type fk=number;
type bool=boolean;

let fields =[
${(0, export_table_lib_1.foreach)(fields, f => `
	"${f.name}",
`)}
]

export class ${RowClass}{
	
${(0, export_table_lib_1.foreach)(fields, f => `
        /**
         * ${f.describe}
         **/
        ${getFieldName(f.name)}: ${getFieldType(f)} = ${getFieldDefault(f)}

${(0, export_table_lib_1.iff)(f.type == "fk", () => `
${(0, export_table_lib_1.iff)(getFkFieldType(f).toLowerCase() != "uid", () => `
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
${(0, export_table_lib_1.iff)(f.type == "fk[]", () => `
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

let ${name}: ${RowClass}[]=[];

let rowData:any[]=
[
${(0, export_table_lib_1.foreach)(datas, d => `
	${JSON.stringify(d)},
`)}
]

let tableData: ${RowClass}[] = []
for (let record of rowData) {
    let obj = new ${RowClass} () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}

${(0, export_table_lib_1.iff)(mapfield, () => `
export let ${mapName}:{
${(0, export_table_lib_1.foreach)(objects, o => `
    /** ${JSON.stringify(o)} */
    ["${o[mapfield.name]}"]:${RowClass}
	`)}
}={} as any
`)}

for(let r of tableData){
    ${name}.push(r);
${(0, export_table_lib_1.iff)(mapfield, () => `
    (${mapName} as any)[r.${mapfield.name}] = r;
`)}
}

/**
 * ${table.nameOrigin}
 */
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
