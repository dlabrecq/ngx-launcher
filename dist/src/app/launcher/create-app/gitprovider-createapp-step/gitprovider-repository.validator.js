import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { GitProviderService } from '../../service/git-provider.service';
var GitProviderRepositoryValidatorDirective = /** @class */ (function () {
    function GitProviderRepositoryValidatorDirective(gitProvider) {
        this.gitProvider = gitProvider;
        this.pattern = /^[a-zA-Z0-9][a-zA-Z0-9-._]{1,63}$/;
    }
    GitProviderRepositoryValidatorDirective.prototype.validate = function (control) {
        return this.validRepositoryName(control).debounceTime(500).distinctUntilChanged().first();
    };
    GitProviderRepositoryValidatorDirective.prototype.validRepositoryName = function (control) {
        var _this = this;
        return new Observable(function (resolve) {
            var valid = _this.pattern.test(control.value);
            var org = control.parent.get('ghOrg').value;
            if (!valid) {
                resolve.next(_this.createError('pattern', control.value));
            }
            else if (org) {
                _this.gitProvider.isGitHubRepo(org, control.value).subscribe(function (duplicate) { return resolve.next(duplicate ? _this.createError('duplicate', control.value) : {}); });
            }
        });
    };
    GitProviderRepositoryValidatorDirective.prototype.createError = function (key, value) {
        return _a = {}, _a[key] = { value: value }, _a;
        var _a;
    };
    GitProviderRepositoryValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[validateRepository]',
                    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(function () { return GitProviderRepositoryValidatorDirective; }), multi: true }]
                },] },
    ];
    /** @nocollapse */
    GitProviderRepositoryValidatorDirective.ctorParameters = function () { return [
        { type: GitProviderService, },
    ]; };
    return GitProviderRepositoryValidatorDirective;
}());
export { GitProviderRepositoryValidatorDirective };
//# sourceMappingURL=gitprovider-repository.validator.js.map