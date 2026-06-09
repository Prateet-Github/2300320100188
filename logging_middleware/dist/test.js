"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function main() {
    try {
        console.log("Testing logger...");
        await (0, index_1.Log)("backend", "info", "service", "Logger initialized successfully");
        console.log("Log sent successfully");
    }
    catch (error) {
        console.error("Logger test failed:", error);
    }
}
main();
//# sourceMappingURL=test.js.map