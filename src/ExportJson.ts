
import { cmm, HandleSheetParams, Field, foreach, IPlugin, st, PluginBase, HandleBatchParams, OutFilePath } from "windy-quicktable"
import * as fs from "fs-extra"

export function export_stuff(paras: HandleSheetParams): string | null {
	let {
		datas,
		fields,
		name,
		objects,
	} = paras;

	let mainField: Field = fields.find(f => f.type == "uid") ?? fields[0]
	let temp = `
{
${foreach(objects, obj => `
    "${obj[mainField.name]}" : ${JSON.stringify(obj)}
`, ",\n")}
}
`
	return temp

}

export class ExportJsonPlugin extends PluginBase {
	name = "json"
	tags: string[] = ["json"]

	handleSheet(paras: HandleSheetParams) {
		let content = export_stuff(paras)
		if (content != null) {
			let savePath = new OutFilePath(paras.outPath, paras.table.name, ".json").fullPath
			fs.outputFileSync(savePath, content, "utf-8")
		}
		return content
	}
}

export const ExportPlugins = [
	new ExportJsonPlugin(),
]
