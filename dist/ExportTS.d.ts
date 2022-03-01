import { HandleSheetParams, PluginBase } from "export-table-lib";
export declare class Cond {
    protected lines: string[];
    protected finished: boolean;
    if(cond: boolean, call: () => string): this | undefined;
    elseif(cond: boolean, call: () => string): this | undefined;
    else(call: () => string): this | undefined;
    toString(): string;
}
export declare function iff(cond: boolean, call: () => string): Cond;
export declare function iff(cond: any, call: () => string): Cond;
export declare function export_stuff(paras: HandleSheetParams): string | null;
export declare class ExportTSPlugin extends PluginBase {
    name: string;
    tags: string[];
    handleSheet(paras: HandleSheetParams): string | null;
}
//# sourceMappingURL=ExportTS.d.ts.map