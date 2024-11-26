"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = downloadFile;
const _0g_ts_sdk_1 = require("@0glabs/0g-ts-sdk");
const config_1 = require("./config");
async function downloadFile(rootHash, outputPath) {
    const indexer = new _0g_ts_sdk_1.Indexer(config_1.indRpc);
    const err = await indexer.download(rootHash, outputPath, false);
    if (err !== null) {
        console.error("Error downloading file:", err);
    }
    else {
        console.log("File downloaded successfully to", outputPath);
    }
}
