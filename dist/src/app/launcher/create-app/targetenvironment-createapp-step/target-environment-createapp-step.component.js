var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Host, Input, Optional, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Broadcaster } from 'ngx-base';
import { TargetEnvironmentService } from '../../service/target-environment.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { TokenService } from '../../service/token.service';
var TargetEnvironmentCreateappStepComponent = /** @class */ (function (_super) {
    __extends(TargetEnvironmentCreateappStepComponent, _super);
    function TargetEnvironmentCreateappStepComponent(launcherComponent, targetEnvironmentService, tokenService, broadcaster, _DomSanitizer) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.targetEnvironmentService = targetEnvironmentService;
        _this.tokenService = tokenService;
        _this.broadcaster = broadcaster;
        _this._DomSanitizer = _DomSanitizer;
        _this.subscriptions = [];
        _this._clusters = [];
        return _this;
    }
    TargetEnvironmentCreateappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    TargetEnvironmentCreateappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        setTimeout(function () {
            _this.restoreSummary();
        }, 10); // Avoids ExpressionChangedAfterItHasBeenCheckedError
        if (this.tokenService) {
            this.subscriptions.push(this.tokenService.clusters.subscribe(function (clusters) {
                _this._clusters = clusters.sort(_this.clusterSortFn);
            }));
        }
        this.subscriptions.push(this.targetEnvironmentService.getTargetEnvironments().subscribe(function (val) {
            if (val !== undefined) {
                _this._targetEnvironments = val;
            }
        }));
    };
    Object.defineProperty(TargetEnvironmentCreateappStepComponent.prototype, "completed", {
        // Accessors
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            return this.launcherComponent.summary.targetEnvironment
                && (this.launcherComponent.summary.targetEnvironment === 'zip' || !!this.launcherComponent.summary.cluster);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TargetEnvironmentCreateappStepComponent.prototype, "targetEnvironments", {
        /**
         * Returns target environments to display
         *
         * @returns {TargetEnvironment[]} The target environments to display
         */
        get: function () {
            return this._targetEnvironments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TargetEnvironmentCreateappStepComponent.prototype, "clusters", {
        /**
         * Returns clusters to display
         *
         * @returns {Cluster[]} The clusters to display
         */
        get: function () {
            return this._clusters;
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    TargetEnvironmentCreateappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('TargetEnvironment');
    };
    TargetEnvironmentCreateappStepComponent.prototype.showStep = function (id, reset) {
        if (reset) {
            this.launcherComponent.summary.targetEnvironment = undefined;
        }
        this.launcherComponent.showStep(id);
    };
    TargetEnvironmentCreateappStepComponent.prototype.selectCluster = function (cluster) {
        this.launcherComponent.summary.cluster = cluster;
        this.broadcaster.broadcast('cluster', cluster);
    };
    TargetEnvironmentCreateappStepComponent.prototype.updateTargetEnvSelection = function (target) {
        if (target.id === 'zip') {
            this.selectCluster(null);
        }
    };
    // Private
    // Restore mission & runtime summary
    TargetEnvironmentCreateappStepComponent.prototype.restoreSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (selection !== undefined) {
            this.launcherComponent.summary.targetEnvironment = selection.targetEnvironment;
            this.launcherComponent.summary.cluster = selection.cluster;
        }
    };
    TargetEnvironmentCreateappStepComponent.prototype.clusterSortFn = function (a, b) {
        if (a.connected) {
            return -1;
        }
        return a.name.localeCompare(b.name);
    };
    TargetEnvironmentCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-targetenvironment-createapp-step',
                    template: require('./target-environment-createapp-step.component.html'),
                    styles: [require('./target-environment-createapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    TargetEnvironmentCreateappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: TargetEnvironmentService, },
        { type: TokenService, decorators: [{ type: Optional },] },
        { type: Broadcaster, },
        { type: DomSanitizer, },
    ]; };
    TargetEnvironmentCreateappStepComponent.propDecorators = {
        'id': [{ type: Input },],
    };
    return TargetEnvironmentCreateappStepComponent;
}(LauncherStep));
export { TargetEnvironmentCreateappStepComponent };
//# sourceMappingURL=target-environment-createapp-step.component.js.map