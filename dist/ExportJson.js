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
exports.ExportPlugins = exports.ExportJsonPlugin = exports.export_stuff = void 0;
const export_table_lib_1 = require("export-table-lib");
const fs = __importStar(require("fs-extra"));
function export_stuff(paras) {
    var _a;
    let { datas, fields, name, objects, } = paras;
    let mainField = (_a = fields.find(f => f.type == "uid")) !== null && _a !== void 0 ? _a : fields[0];
    let temp = `
{
${(0, export_table_lib_1.foreach)(objects, obj => `
    "${obj[mainField.name]}" : ${JSON.stringify(obj)}
`, ",\n")}
}
`;
    return temp;
}
exports.export_stuff = export_stuff;
class ExportJsonPlugin extends export_table_lib_1.PluginBase {
    constructor() {
        super(...arguments);
        this.name = "json";
        this.tags = ["json"];
    }
    handleSheet(paras) {
        let content = export_stuff(paras);
        if (content != null) {
            let savePath = new export_table_lib_1.OutFilePath(paras.outPath, paras.table.name, ".json").fullPath;
            fs.outputFileSync(savePath, content, "utf-8");
        }
        return content;
    }
}
exports.ExportJsonPlugin = ExportJsonPlugin;
exports.ExportPlugins = [
    new ExportJsonPlugin(),
];
