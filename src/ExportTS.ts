
import { cmm, HandleSheetParams, Field, foreach, IPlugin, st, PluginBase, HandleBatchParams, OutFilePath } from "export-table-lib"
import * as fs from "fs-extra"

export function export_stuff(paras: HandleSheetParams): string | null {
	let {
		datas,
		fields,
		name,
		objects,
	} = paras;

	let firstLetterUpper = function (str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	let firstLetterLower = function (str: string) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};
	let convMemberName = firstLetterUpper
	let convVarName = firstLetterLower

	let RowClass = firstLetterUpper(name)
	let initFunc = name + "Init"
	let mapfield = fields.find(a => a.type == "key")//如果是map，则生成对应的map
	let mapName = name + "Map"

	let getFieldType = function (f: Field) {
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
			return "number";
		} else if (t == "bool") {
			return "boolean";
		} else if (t == "bool[]") {
			return "boolean[]";
		} else if (t == "string") {
			return "string";
		} else if (t == "string[]") {
			return "string[]";
		} else if (t == "fk") {
			return "number";
		} else if (t == "fk[]") {
			return "number[]";
		} else if (t == "any") {
			return "any";
		} else if (t == "key") {
			return "string";
		} else {
			throw new Error(`invalid type ${f.name}:<unkown>`)
		}
		return t;
	}

	const genValue = (value: any, f: Field): string => {
		let t = f.type
		if (t == "object") {
			return JSON.stringify(value)
		} else if (t == "object[]") {
			return JSON.stringify(value)
		} else if (t == "number") {
			return `${value}`
		} else if (t == "number[]") {
			let values = value as number[]
			return `[${values.join(", ")}]`
		} else if (t == "uid") {
			return `${value}`
		} else if (t == "bool") {
			return `${value}`
		} else if (t == "bool[]") {
			let values = value as boolean[]
			return `[${values.join(", ")}]`
		} else if (t == "string") {
			return `"${value}"`
		} else if (t == "string[]") {
			let values = value as string[]
			return `[${values.map(v => `"${v}"`).join(", ")}]`
		} else if (t == "fk") {
			return `${value}`
		} else if (t == "fk[]") {
			let values = value as number[]
			return `[${values.join(", ")}]`
		} else if (t == "any") {
			JSON.stringify(value)
		} else if (t == "key") {
			return `${value}`
		}

		throw new Error(`invalid type ${f.name}:<unkown>`)
	}

	const getTitle = (v: Field) => {
		return v.describe.split("\n")[0]
	}

	const getDescripts = (v: Field) => {
		return v.describe.split("\n")
	}

	let mainField: Field = fields.find(f => f.type == "uid") ?? fields[0]
	let temp = `

export class ${RowClass}{
${foreach(fields, f => `
	/** ${f.describe} */
	${f.name}!: ${getFieldType(f)}
`)}
}

export type T${RowClass}Map = { [key: string]: ${RowClass} }
export const ${RowClass}Map: T${RowClass}Map =
{
${foreach(objects, obj => `
    "${obj[mainField.name]}" : {
		${foreach(fields, (f) => `
"${f.name}": ${genValue(obj[f.name], f)},
`, " ")}
	},
`)}
}
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
