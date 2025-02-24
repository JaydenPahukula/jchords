"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rootHandler = (request, response) => {
    return response.status(200).send('hello');
};
exports.default = rootHandler;
