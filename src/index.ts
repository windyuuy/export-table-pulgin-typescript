
import { ExportJsonPlugin } from "./ExportJson";
import { ExportTSPlugin } from "./ExportTS";

export const ExportPlugins = [
	new ExportTSPlugin(),
	new ExportJsonPlugin(),
]
