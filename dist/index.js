"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("./upload");
const download_1 = require("./download");
async function main() {
    const filePath = "./example.txt"; // Replace with your file path
    const rootHash = "<REPLACE_WITH_ROOT_HASH>"; // Replace with actual root hash
    const outputPath = "./downloaded.txt";
    console.log("Uploading file...");
    await (0, upload_1.uploadFile)(filePath);
    console.log("Downloading file...");
    await (0, download_1.downloadFile)(rootHash, outputPath);
}
