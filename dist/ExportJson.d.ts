import { HandleSheetParams, PluginBase } from "export-table-lib";
export declare function export_stuff(paras: HandleSheetParams): string | null;
export declare class ExportJsonPlugin extends PluginBase {
    name: string;
    tags: string[];
    handleSheet(paras: HandleSheetParams): string | null;
}
export declare const ExportPlugins: ExportJsonPlugin[];
//# sourceMappingURL=ExportJson.d.ts.map