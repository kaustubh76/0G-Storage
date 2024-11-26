"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
const _0g_ts_sdk_1 = require("@0glabs/0g-ts-sdk");
const config_1 = require("./config");
async function uploadFile(filePath) {
    const file = await _0g_ts_sdk_1.ZgFile.fromFilePath(filePath);
    const indexer = new _0g_ts_sdk_1.Indexer(config_1.indRpc);
    const flowContract = (0, _0g_ts_sdk_1.getFlowContract)(config_1.flowAddr, config_1.signer);
    const [tx, err] = await indexer.upload(file, 0, config_1.signer.provider, config_1.signer, config_1.flowAddr);
    if (err === null) {
        console.log("File uploaded successfully, transaction:", tx);
    }
    else {
        console.error("Error uploading file:", err);
    }
    await file.close();
}
