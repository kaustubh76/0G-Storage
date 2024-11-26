"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signer = exports.provider = exports.indRpc = exports.flowAddr = exports.privateKey = exports.evmRpc = void 0;
const ethers_1 = require("ethers");
exports.evmRpc = "https://evmrpc-testnet.0g.ai/";
exports.privateKey = "<YOUR_PRIVATE_KEY>"; // Replace with your private key
exports.flowAddr = "0xbD2C3F0E65eDF5582141C35969d66e34629cC768"; // Turbo mode
exports.indRpc = "https://indexer-storage-testnet-standard.0g.ai";
exports.provider = new ethers_1.ethers.JsonRpcProvider(exports.evmRpc);
exports.signer = new ethers_1.ethers.Wallet(exports.privateKey, exports.provider);
