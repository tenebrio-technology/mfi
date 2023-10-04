"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockResponse = void 0;
var MockResponse = /** @class */ (function () {
    function MockResponse() {
        this.body = '';
    }
    MockResponse.prototype.send = function (data) {
        this.body = JSON.stringify(data);
    };
    return MockResponse;
}());
exports.MockResponse = MockResponse;
