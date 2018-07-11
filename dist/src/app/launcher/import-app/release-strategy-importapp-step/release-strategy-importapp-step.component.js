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
import { FilterType } from 'patternfly-ng/filter';
import { PipelineService } from '../../service/pipeline.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { broadcast } from '../../shared/telemetry.decorator';
var ReleaseStrategyImportappStepComponent = /** @class */ (function (_super) {
    __extends(ReleaseStrategyImportappStepComponent, _super);
    function ReleaseStrategyImportappStepComponent(launcherComponent, pipelineService) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.pipelineService = pipelineService;
        _this.optional = false;
        _this.isAscendingSort = true;
        _this.subscriptions = [];
        return _this;
    }
    ReleaseStrategyImportappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterConfig = {
            fields: [{
                    id: 'name',
                    title: 'Name',
                    placeholder: 'Filter by Name...',
                    type: FilterType.TEXT
                }],
            appliedFilters: []
        };
        this.sortConfig = {
            fields: [{
                    id: 'name',
                    title: 'Name',
                    sortType: 'alpha'
                }],
            isAscending: this.isAscendingSort
        };
        this.toolbarConfig = {
            filterConfig: this.filterConfig,
            sortConfig: this.sortConfig
        };
        this.launcherComponent.addStep(this);
        this.subscriptions.push(this.pipelineService.getPipelines().subscribe(function (result) {
            _this._pipelines = result;
            _this.restoreSummary();
        }));
    };
    ReleaseStrategyImportappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(ReleaseStrategyImportappStepComponent.prototype, "pipelines", {
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
    Object.defineProperty(ReleaseStrategyImportappStepComponent.prototype, "pipelineId", {
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
    Object.defineProperty(ReleaseStrategyImportappStepComponent.prototype, "completed", {
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
    // Filter
    ReleaseStrategyImportappStepComponent.prototype.applyFilters = function (filters) {
        var _this = this;
        this._pipelines = [];
        if (filters && filters.length > 0) {
            this.allPipelines.forEach(function (pipeline) {
                if (_this.matchesFilters(pipeline, filters)) {
                    _this._pipelines.push(pipeline);
                }
            });
        }
        else {
            this._pipelines = this.allPipelines;
        }
    };
    // Handle filter changes
    ReleaseStrategyImportappStepComponent.prototype.filterChanged = function ($event) {
        this.applyFilters($event.appliedFilters);
    };
    ReleaseStrategyImportappStepComponent.prototype.matchesFilter = function (item, filter) {
        var match = true;
        if (filter.field.id === 'name') {
            match = item.name.match(filter.value) !== null;
        }
        return match;
    };
    ReleaseStrategyImportappStepComponent.prototype.matchesFilters = function (item, filters) {
        var _this = this;
        var matches = true;
        filters.forEach(function (filter) {
            if (!_this.matchesFilter(item, filter)) {
                matches = false;
                return matches;
            }
        });
        return matches;
    };
    // Sort
    ReleaseStrategyImportappStepComponent.prototype.compare = function (item1, item2) {
        var compValue = 0;
        if (this.currentSortField.id === 'name') {
            compValue = item1.name.localeCompare(item2.name);
        }
        if (!this.isAscendingSort) {
            compValue = compValue * -1;
        }
        return compValue;
    };
    // Handle sort changes
    ReleaseStrategyImportappStepComponent.prototype.sortChanged = function ($event) {
        var _this = this;
        this.currentSortField = $event.field;
        this.isAscendingSort = $event.isAscending;
        this._pipelines.sort(function (item1, item2) { return _this.compare(item1, item2); });
    };
    // Steps
    ReleaseStrategyImportappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('ReleaseStrategy');
    };
    ReleaseStrategyImportappStepComponent.prototype.showStep = function (id, reset) {
        if (reset) {
            this.launcherComponent.summary.pipeline = undefined;
        }
        this.launcherComponent.showStep(id);
    };
    ReleaseStrategyImportappStepComponent.prototype.updatePipelineSelection = function (pipeline) {
        this.launcherComponent.summary.pipeline = pipeline;
    };
    // Private
    // Restore mission & runtime summary
    ReleaseStrategyImportappStepComponent.prototype.restoreSummary = function () {
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
    ReleaseStrategyImportappStepComponent.prototype.toggleExpanded = function (pipeline) {
        pipeline.expanded = (pipeline.expanded !== undefined) ? !pipeline.expanded : false;
    };
    ReleaseStrategyImportappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-releasestrategy-importapp-step',
                    template: require('./release-strategy-importapp-step.component.html'),
                    styles: [require('./release-strategy-importapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ReleaseStrategyImportappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: PipelineService, },
    ]; };
    ReleaseStrategyImportappStepComponent.propDecorators = {
        'id': [{ type: Input },],
        'optional': [{ type: Input },],
    };
    __decorate([
        broadcast('completePipelineStep_Import', {
            'launcherComponent.summary.pipeline': {
                pipeline: 'name'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ReleaseStrategyImportappStepComponent.prototype, "navToNextStep", null);
    return ReleaseStrategyImportappStepComponent;
}(LauncherStep));
export { ReleaseStrategyImportappStepComponent };
//# sourceMappingURL=release-strategy-importapp-step.component.js.map