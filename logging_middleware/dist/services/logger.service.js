"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("../config/constants");
dotenv_1.default.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is missing");
}
async function Log(stack, level, packageName, message) {
    try {
        console.log("LOGGER TOKEN:", process.env.ACCESS_TOKEN?.slice(0, 30));
        await axios_1.default.post(constants_1.LOG_API_URL, {
            stack,
            level,
            package: packageName,
            message,
        }, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.error("Failed to create log:", error);
        throw error;
    }
}
//# sourceMappingURL=logger.service.js.map