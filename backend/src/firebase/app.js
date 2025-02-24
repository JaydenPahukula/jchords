"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
exports.default = app;
