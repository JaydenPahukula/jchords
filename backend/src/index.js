"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const https_1 = require("firebase-functions/v2/https");
const root_1 = __importDefault(require("src/handlers/root"));
const expressApp = (0, express_1.default)();
expressApp.use((0, cors_1.default)({ origin: true }));
expressApp.get('/api', root_1.default);
exports.api = (0, https_1.onRequest)(expressApp);
