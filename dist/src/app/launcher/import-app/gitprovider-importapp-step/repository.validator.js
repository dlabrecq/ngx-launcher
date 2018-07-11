import { NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
var ExistingRepositoryValidatorDirective = /** @class */ (function () {
    function ExistingRepositoryValidatorDirective() {
    }
    ExistingRepositoryValidatorDirective.prototype.validate = function (control) {
        return this.repoList ? repositoryValidator(this.repoList)(control) : null;
    };
    ExistingRepositoryValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[existingRepository]',
                    providers: [{ provide: NG_VALIDATORS, useExisting: ExistingRepositoryValidatorDirective, multi: true }]
                },] },
    ];
    /** @nocollapse */
    ExistingRepositoryValidatorDirective.ctorParameters = function () { return []; };
    ExistingRepositoryValidatorDirective.propDecorators = {
        'repoList': [{ type: Input, args: ['existingRepository',] },],
    };
    return ExistingRepositoryValidatorDirective;
}());
export { ExistingRepositoryValidatorDirective };
export function repositoryValidator(repoList) {
    return function (control) {
        var existingRepo = repoList.indexOf(control.value) !== -1;
        return existingRepo ? null : { 'notExist': { value: control.value } };
    };
}
//# sourceMappingURL=repository.validator.js.map