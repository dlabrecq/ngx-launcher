import { Component, Input, ViewEncapsulation } from '@angular/core';
var ToastNotificationComponent = /** @class */ (function () {
    function ToastNotificationComponent() {
    }
    ToastNotificationComponent.prototype.closeToastNotification = function (notification) {
        this.notifications.splice(this.notifications.indexOf(notification), 1);
    };
    ToastNotificationComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'fab-toast-notification',
                    template: require('./toast-notification.component.html'),
                    styles: [require('./toast-notification.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ToastNotificationComponent.ctorParameters = function () { return []; };
    ToastNotificationComponent.propDecorators = {
        'notifications': [{ type: Input },],
    };
    return ToastNotificationComponent;
}());
export { ToastNotificationComponent };
//# sourceMappingURL=toast-notification.component.js.map