import { Component, Host } from '@angular/core';
import { LauncherComponent } from '../launcher.component';
var CancelOverlayComponent = /** @class */ (function () {
    function CancelOverlayComponent(launcherComponent) {
        this.launcherComponent = launcherComponent;
    }
    CancelOverlayComponent.prototype.ngOnInit = function () {
    };
    /**
     * Cancel aborted
     */
    CancelOverlayComponent.prototype.cancelAborted = function () {
        this.launcherComponent.cancelAborted();
    };
    /**
     * Cancel confirmed
     */
    CancelOverlayComponent.prototype.cancelConfirmed = function () {
        this.launcherComponent.cancelConfirmed();
    };
    CancelOverlayComponent.decorators = [
        { type: Component, args: [{
                    selector: 'f8launcher-cancel-overlay',
                    template: require('./cancel-overlay.component.html'),
                    styles: [require('./cancel-overlay.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    CancelOverlayComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
    ]; };
    return CancelOverlayComponent;
}());
export { CancelOverlayComponent };
//# sourceMappingURL=cancel-overlay.component.js.map