import { ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { TokenService } from '../../service/token.service';
var LinkAccountsCreateappStepComponent = /** @class */ (function () {
    function LinkAccountsCreateappStepComponent(tokenService, changeDetector) {
        this.tokenService = tokenService;
        this.changeDetector = changeDetector;
        this.select = new EventEmitter(true);
        this._clusters = [];
    }
    LinkAccountsCreateappStepComponent.prototype.selectCluster = function (cluster) {
        this.clusterId = cluster.id;
        this.select.emit(cluster);
    };
    Object.defineProperty(LinkAccountsCreateappStepComponent.prototype, "clusters", {
        get: function () {
            return this._clusters;
        },
        set: function (clusters) {
            this._clusters = clusters;
            this.autoSetCluster();
        },
        enumerable: true,
        configurable: true
    });
    LinkAccountsCreateappStepComponent.prototype.autoSetCluster = function () {
        var connectedClusters = this.clusters.filter(function (c) { return c.connected; });
        if (connectedClusters.length === 1) {
            this.selectCluster(connectedClusters[0]);
            this.changeDetector.detectChanges();
        }
    };
    LinkAccountsCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    selector: 'f8launcher-link-accounts-createapp-step',
                    template: require('./link-accounts-createapp-step.component.html'),
                    styles: [require('./link-accounts-createapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    LinkAccountsCreateappStepComponent.ctorParameters = function () { return [
        { type: TokenService, decorators: [{ type: Optional },] },
        { type: ChangeDetectorRef, },
    ]; };
    LinkAccountsCreateappStepComponent.propDecorators = {
        'select': [{ type: Output },],
        'clusters': [{ type: Input },],
    };
    return LinkAccountsCreateappStepComponent;
}());
export { LinkAccountsCreateappStepComponent };
//# sourceMappingURL=link-accounts-createapp-step.component.js.map