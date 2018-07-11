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
import { PipelineService } from '../../service/pipeline.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { broadcast } from '../../shared/telemetry.decorator';
var ReleaseStrategyCreateappStepComponent = /** @class */ (function (_super) {
    __extends(ReleaseStrategyCreateappStepComponent, _super);
    function ReleaseStrategyCreateappStepComponent(launcherComponent, pipelineService) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.pipelineService = pipelineService;
        _this.subscriptions = [];
        return _this;
    }
    ReleaseStrategyCreateappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        var filterByRuntime = 'maven';
        if (this.launcherComponent && this.launcherComponent.summary && this.launcherComponent.summary.runtime) {
            filterByRuntime = this.launcherComponent.summary.runtime.pipelinePlatform;
        }
        this.subscriptions.push(this.pipelineService.getPipelines(filterByRuntime).subscribe(function (result) {
            _this._pipelines = result;
            _this.restoreSummary();
        }));
    };
    ReleaseStrategyCreateappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(ReleaseStrategyCreateappStepComponent.prototype, "pipelines", {
        // Accessors
        /**
         * Returns a list of pipelines to display
         *
         * @returns {Pipeline[]} The list of pipelines
         */
        get: function () {
            return this._pipelines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReleaseStrategyCreateappStepComponent.prototype, "pipelineId", {
        /**
         * Returns pipeline ID
         *
         * @returns {string} The pipeline ID
         */
        get: function () {
            return this._pipelineId;
        },
        /**
         * Set the pipeline ID
         *
         * @param {string} val The pipeline ID
         */
        set: function (val) {
            this._pipelineId = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReleaseStrategyCreateappStepComponent.prototype, "completed", {
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            return (this.launcherComponent.summary.pipeline !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    ReleaseStrategyCreateappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('ReleaseStrategy');
    };
    ReleaseStrategyCreateappStepComponent.prototype.showStep = function (id, reset) {
        if (reset) {
            this.launcherComponent.summary.pipeline = undefined;
        }
        this.launcherComponent.showStep(id);
    };
    ReleaseStrategyCreateappStepComponent.prototype.updatePipelineSelection = function (pipeline) {
        this.launcherComponent.summary.pipeline = pipeline;
    };
    // Private
    // Restore mission & runtime summary
    ReleaseStrategyCreateappStepComponent.prototype.restoreSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (selection === undefined) {
            return;
        }
        this.pipelineId = selection.pipelineId;
        for (var i = 0; i < this.pipelines.length; i++) {
            if (this.pipelineId === this.pipelines[i].id) {
                this.launcherComponent.summary.pipeline = this.pipelines[i];
            }
        }
    };
    ReleaseStrategyCreateappStepComponent.prototype.toggleExpanded = function (pipeline) {
        pipeline.expanded = (pipeline.expanded !== undefined) ? !pipeline.expanded : true;
    };
    ReleaseStrategyCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-releasestrategy-createapp-step',
                    template: require('./release-strategy-createapp-step.component.html'),
                    styles: [require('./release-strategy-createapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ReleaseStrategyCreateappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: PipelineService, },
    ]; };
    ReleaseStrategyCreateappStepComponent.propDecorators = {
        'id': [{ type: Input },],
    };
    __decorate([
        broadcast('completePipelineStep_Create', {
            'launcherComponent.summary.pipeline': {
                pipeline: 'name'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ReleaseStrategyCreateappStepComponent.prototype, "navToNextStep", null);
    return ReleaseStrategyCreateappStepComponent;
}(LauncherStep));
export { ReleaseStrategyCreateappStepComponent };
//# sourceMappingURL=release-strategy-createapp-step.component.js.map