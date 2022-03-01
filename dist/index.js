"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportPlugins = void 0;
const ExportJson_1 = require("./ExportJson");
const ExportTS_1 = require("./ExportTS");
exports.ExportPlugins = [
    new ExportTS_1.ExportTSPlugin(),
    new ExportJson_1.ExportJsonPlugin(),
];
