import { Injectable } from '@angular/core';
var TokenProvider = /** @class */ (function () {
    function TokenProvider() {
    }
    TokenProvider.prototype.getToken = function () {
        return '';
    };
    TokenProvider.prototype.getGitHubToken = function () {
        return '';
    };
    TokenProvider.prototype.isPromise = function (token) {
        return token.then !== undefined;
    };
    Object.defineProperty(TokenProvider.prototype, "token", {
        get: function () {
            var token = this.getToken();
            if (this.isPromise(token)) {
                return token;
            }
            else {
                return Promise.resolve(token);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenProvider.prototype, "gitHubToken", {
        get: function () {
            var token = this.getGitHubToken();
            if (this.isPromise(token)) {
                return token;
            }
            else {
                return Promise.resolve(token);
            }
        },
        enumerable: true,
        configurable: true
    });
    TokenProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TokenProvider.ctorParameters = function () { return []; };
    return TokenProvider;
}());
export { TokenProvider };
//# sourceMappingURL=token-provider.js.map