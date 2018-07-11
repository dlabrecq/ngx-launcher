import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
var LowerCaseDirective = /** @class */ (function () {
    function LowerCaseDirective() {
        this.ngModelChange = new EventEmitter();
    }
    LowerCaseDirective.prototype.onInputChange = function ($event) {
        this.value = $event.target.value.toLowerCase();
        this.ngModelChange.emit(this.value);
    };
    LowerCaseDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngModel][lowercase]'
                },] },
    ];
    /** @nocollapse */
    LowerCaseDirective.ctorParameters = function () { return []; };
    LowerCaseDirective.propDecorators = {
        'ngModelChange': [{ type: Output },],
        'onInputChange': [{ type: HostListener, args: ['input', ['$event'],] },],
    };
    return LowerCaseDirective;
}());
export { LowerCaseDirective };
//# sourceMappingURL=lowercase.directive.js.map