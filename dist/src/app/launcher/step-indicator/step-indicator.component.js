var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { LauncherComponent } from '../launcher.component';
import { DependencyCheckService } from '../service/dependency-check.service';
import { broadcast } from '../shared/telemetry.decorator';
var StepIndicatorComponent = /** @class */ (function () {
    function StepIndicatorComponent(launcherComponent, dependencyCheckService) {
        this.launcherComponent = launcherComponent;
        this.dependencyCheckService = dependencyCheckService;
        /**
         * Show appropriate style while steps are in progress of being shown
         *
         * @type {boolean}
         */
        this.inProgress = false;
    }
    StepIndicatorComponent.prototype.ngOnInit = function () {
        this.restoreSummary();
    };
    // Steps
    /**
     * Navigate to next step
     */
    StepIndicatorComponent.prototype.navToNextStep = function (fromStepId) {
        var steps = this.launcherComponent.steps.filter(function (step) { return !step.hidden; });
        var index = steps.findIndex(function (step) { return step.id === fromStepId; });
        this.navToStep(steps[index + 1].id);
    };
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    StepIndicatorComponent.prototype.navToStep = function (id) {
        var _this = this;
        var element = document.getElementById(id);
        if (element !== null) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(function () {
            // The onInViewportChange event doesn't always set the ID as expected
            _this.launcherComponent.onInViewportChange(true, id);
        }, 10);
    };
    StepIndicatorComponent.prototype.broadcastEvent = function () { };
    // Restore mission & runtime summary
    StepIndicatorComponent.prototype.restoreSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (selection === undefined) {
            return;
        }
        this.launcherComponent.summary.dependencyCheck.projectName = selection.projectName;
    };
    StepIndicatorComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-step-indicator',
                    template: require('./step-indicator.component.html'),
                    styles: [require('./step-indicator.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    StepIndicatorComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: DependencyCheckService, },
    ]; };
    StepIndicatorComponent.propDecorators = {
        'inProgress': [{ type: Input },],
    };
    __decorate([
        broadcast('stepIndicatorClicked', { step: '[0]' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], StepIndicatorComponent.prototype, "navToStep", null);
    __decorate([
        broadcast('stepIndicatorProjectInputClicked', {}),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StepIndicatorComponent.prototype, "broadcastEvent", null);
    return StepIndicatorComponent;
}());
export { StepIndicatorComponent };
//# sourceMappingURL=step-indicator.component.js.map