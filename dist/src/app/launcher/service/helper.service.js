import { Injectable } from '@angular/core';
import { Config } from '../../../app/service/config.component';
var HelperService = /** @class */ (function () {
    function HelperService(config) {
        this.config = config;
        this.keys = {
            BACKEND: 'backend_url',
            ORIGIN: 'origin'
        };
    }
    HelperService.prototype.getBackendUrl = function () {
        if (this.config) {
            return this.config.get(this.keys.BACKEND);
        }
        return null;
    };
    HelperService.prototype.getOrigin = function () {
        if (this.config) {
            return this.config.get(this.keys.ORIGIN);
        }
        return null;
    };
    HelperService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HelperService.ctorParameters = function () { return [
        { type: Config, },
    ]; };
    return HelperService;
}());
export { HelperService };
//# sourceMappingURL=helper.service.js.map