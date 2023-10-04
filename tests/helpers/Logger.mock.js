"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockLogger = void 0;
var MockLogger = /** @class */ (function () {
    function MockLogger() {
        var _this = this;
        this.buffer = [];
        this.info = function (msg) { return _this.store('info: ' + msg); };
        this.http = function (msg) { return _this.store('http: ' + msg); };
        this.log = function (msg) { return _this.store('log: ' + msg); };
        this.warn = function (msg) { return _this.store('warn: ' + msg); };
        this.error = function (msg) { return _this.store('error: ' + msg); };
        this.data = function (msg) { return _this.store('data: ' + msg); };
        this.debug = function (msg) { return _this.store('debuga: ' + msg); };
    }
    MockLogger.prototype.store = function (msg) {
        this.buffer.push(msg);
    };
    MockLogger.prototype.last = function (count) {
        var start = count ? this.buffer.length - count : 0;
        return this.buffer.slice(start, this.buffer.length).join('\n');
    };
    MockLogger.prototype.first = function (count) {
        return this.buffer.slice(0, count).join('\n');
    };
    MockLogger.prototype.item = function (index) {
        return this.buffer[index] + '\n';
    };
    return MockLogger;
}());
exports.MockLogger = MockLogger;
