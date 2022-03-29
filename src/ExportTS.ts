
import chalk from "chalk";
import { cmm, HandleSheetParams, Field, foreach, IPlugin, st, PluginBase, HandleBatchParams, OutFilePath, iff, makeFirstLetterUpper, makeFirstLetterLower } from "export-table-lib"
import * as fs from "fs-extra"

export function export_stuff(paras: HandleSheetParams): string | null {
	let {
		datas,
		fields,
		name,
		objects,
		tables,
		table,
	} = paras;

	let RowClass = makeFirstLetterUpper(name) + "Row"
	let initFunc = name + "Init"
	let mapfield = fields.find(a => a.type == "key")//如果是map，则生成对应的map
	let mapName = name + "Map"

	let getFieldType = function (f: Field): string {
		let t = f.type
		if (t == "object") {
			return "object"
		} else if (t == "object[]") {
			return "object[]"
		} else if (t == "number") {
			return "number";
		} else if (t == "number[]") {
			return "number[]";
		} else if (t == "uid") {
			return "uid";
		} else if (t == "bool") {
			return "boolean";
		} else if (t == "bool[]") {
			return "boolean[]";
		} else if (t == "string") {
			return "string";
		} else if (t == "string[]") {
			return "string[]";
		} else if (t == "fk") {
			let ffk = table.getFKField(f)
			let fkType = getFieldType(ffk!)
			return fkType
			// return "number";
		} else if (t == "fk[]") {
			let ffk = table.getFKField(f)
			let fkType = getFieldType(ffk!)
			if (typeof (fkType) == "string") {
				if (fkType.match(/\w+/)) {
					return `${fkType}[]`
				}
			}
			return `(${fkType})[]`
			// return "number[]";
		} else if (t == "any") {
			return "any";
		} else if (t == "key") {
			return "string";
		} else {
			console.error(chalk.red(`invalid type ${f.name}:<unkown>`))
			return "never"
		}
		return t;
	}

	let getFieldName = function (n: string) {
		if (n == "object" || n == "any") {
			return n + "?"
		}
		return n;
	}

	let getFieldDefault = function (f: Field): any {
		let t = f.type
		if (t == "any") {
			return "undefined";
		} else if (t == "uid") {
			return 0;
		} else if (t == "number") {
			return 0
		} else if (t == "bool") {
			return "false"
		} else if (t == "string") {
			return "\"\""
		} else if (t == "string*") {
			return "\"\""
		} else if (t == "object") {
			return "null as any";
		} else if (t == "fk") {
			// return 0;
			let ffk = table.getFKField(f)
			let defaultValue = getFieldDefault(ffk!)
			return defaultValue
		} else if (t == "key") {
			return "\"\""
		} else if (t.endsWith("[]")) {
			return "[]"
		}
		return "undefined"
	}

	let getFkFieldType = function (field: Field) {
		return tables.find(a => a.name == field.fkTableName)!.fields!.find(a => a.name == field.fkFieldName)!.type
	}

	let mainField: Field = fields.find(f => f.type == "uid") ?? fields[0]
	let temp = `
${foreach(fields, f => `
${iff((f.type == "fk" || f.type == "fk[]") && f.fkTableName != name, () => `
import ${f.fkTableName}, { ${f.fkTableName}Row } from "./${f.fkTableName}"
`)}
`).trim()}

type uid=number;
type key=string;
type fk=number;
type bool=boolean;

let fields =[
${foreach(fields, f => `
	"${f.name}",
`)}
]

export class ${RowClass}{
	
${foreach(fields, f => `
        /**
         * ${f.describe}
         **/
        ${getFieldName(f.name)}: ${getFieldType(f)} = ${getFieldDefault(f)}

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

let ${name}: ${RowClass}[]=[];

let rowData=
[
${foreach(datas, d => `
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

${iff(mapfield, () => `
export let ${mapName}:{
${foreach(objects, o => `
    /** ${JSON.stringify(o)} */
    ${o[mapfield!.name]}:${RowClass}
	`)}
}={} as any
`)}

for(let r of tableData){
    ${name}.push(r);
${iff(mapfield, () => `
    (${mapName} as any)[r.${mapfield!.name}] = r;
`)}
}

export default ${name}
`
	return temp

}

export class ExportTSPlugin extends PluginBase {
	name = "typescript"
	tags: string[] = ["ts"]

	handleSheet(paras: HandleSheetParams) {
		let content = export_stuff(paras)
		if (content != null) {
			let savePath = new OutFilePath(paras.outPath, paras.table.name, ".ts").fullPath
			fs.outputFileSync(savePath, content, "utf-8")
		}
		return content
	}
}
