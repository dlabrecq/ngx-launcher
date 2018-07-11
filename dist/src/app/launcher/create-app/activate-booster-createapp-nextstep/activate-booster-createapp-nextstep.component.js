import { Component, Host, ViewEncapsulation } from '@angular/core';
import { LauncherComponent } from '../../launcher.component';
var ActivateBoosterCreateappNextstepComponent = /** @class */ (function () {
    function ActivateBoosterCreateappNextstepComponent(launcherComponent) {
        this.launcherComponent = launcherComponent;
    }
    ActivateBoosterCreateappNextstepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-activatebooster-createapp-nextstep',
                    template: require('./activate-booster-createapp-nextstep.component.html'),
                    styles: [require('./activate-booster-createapp-nextstep.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ActivateBoosterCreateappNextstepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
    ]; };
    return ActivateBoosterCreateappNextstepComponent;
}());
export { ActivateBoosterCreateappNextstepComponent };
//# sourceMappingURL=activate-booster-createapp-nextstep.component.js.map