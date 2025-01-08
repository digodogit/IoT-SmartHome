"use strict";
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: "ts-jest",
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    // An array of file extensions your modules use
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ],
};
exports.default = config;
