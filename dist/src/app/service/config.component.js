import { Injectable } from '@angular/core';
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.load = function () {
        return Promise.resolve();
    };
    Config.prototype.set = function (settings) {
        this.settings = settings;
    };
    Config.prototype.get = function (key) {
        return this.settings[key];
    };
    Config.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return []; };
    return Config;
}());
export { Config };
//# sourceMappingURL=config.component.js.map