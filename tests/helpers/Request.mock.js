"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockRequest = void 0;
var MockRequest = /** @class */ (function () {
    function MockRequest(body) {
        if (body === void 0) { body = {}; }
        this.body = body;
    }
    return MockRequest;
}());
exports.MockRequest = MockRequest;
