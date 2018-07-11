import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { DependencyCheckService } from '../service/dependency-check.service';
var ProjectNameValidatorDirective = /** @class */ (function () {
    function ProjectNameValidatorDirective(dependencyCheckService) {
        this.dependencyCheckService = dependencyCheckService;
        this.pattern = /^[a-z][a-z0-9-]{3,63}$/;
    }
    ProjectNameValidatorDirective.prototype.validate = function (control) {
        return this.validRepositoryName(control.value).debounceTime(500).distinctUntilChanged().first();
    };
    ProjectNameValidatorDirective.prototype.validRepositoryName = function (value) {
        var _this = this;
        return new Observable(function (resolve) {
            var valid = _this.pattern.test(value);
            if (!valid) {
                resolve.next(_this.createError('pattern', value));
            }
            else {
                _this.dependencyCheckService.getApplicationsInASpace().subscribe(function (apps) {
                    var applicationNames = apps.map(function (app) { return app.attributes.name ? app.attributes.name.toLowerCase() : ''; });
                    resolve.next(applicationNames.indexOf(value) !== -1 ? _this.createError('duplicate', value) : {});
                });
            }
        });
    };
    ProjectNameValidatorDirective.prototype.createError = function (key, value) {
        return _a = {}, _a[key] = { value: value }, _a;
        var _a;
    };
    ProjectNameValidatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[validateProjectName]',
                    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(function () { return ProjectNameValidatorDirective; }), multi: true }]
                },] },
    ];
    /** @nocollapse */
    ProjectNameValidatorDirective.ctorParameters = function () { return [
        { type: DependencyCheckService, },
    ]; };
    return ProjectNameValidatorDirective;
}());
export { ProjectNameValidatorDirective };
//# sourceMappingURL=project-name.validator.js.map