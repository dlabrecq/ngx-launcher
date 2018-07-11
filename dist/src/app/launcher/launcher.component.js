var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectSummaryService } from './service/project-summary.service';
import { broadcast } from './shared/telemetry.decorator';
var LauncherComponent = /** @class */ (function () {
    function LauncherComponent(route, router, projectSummaryService) {
        this.route = route;
        this.router = router;
        this.projectSummaryService = projectSummaryService;
        /**
         * Flag indicating to show the import application work flow. Defaults to the create new application work flow.
         *
         * @type {boolean}
         */
        this.importApp = false;
        /**
         * Setting the flow to 'launch' will skip the pipeline step and show a cluster dropdown. Defaults to 'osio'.
         */
        this.flow = 'osio';
        /**
         * Setting the flag to show dependency editor as internal feature
         */
        this.depEditorFlag = false;
        /**
         * The event emitted when an cancel has been selected
         */
        this.onCancel = new EventEmitter();
        /**
         * The event emitted after setup has completed
         */
        this.onComplete = new EventEmitter();
        this._showCancelOverlay = false;
        this._steps = [];
        this.summaryCompleted = false;
        this.showGitProvider = false;
        this.showMissionRuntime = false;
        this.showProjectSummary = true;
        this.showReleaseStrategy = false;
        this.showSelectDependencies = false;
        this.showTargetEnvironment = false;
    }
    LauncherComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var params = _this.selectionParams;
            var id = (_this.selectionParams !== undefined) ? 'GitProvider' : _this.firstNonHiddenStep.id;
            // this.stepIndicator.navToStep(id);
            if (id === 'GitProvider') {
                _this.showStep('GitProvider');
            }
        }, 300);
    };
    LauncherComponent.prototype.ngOnInit = function () {
        var projectName = this.route.snapshot.params['projectName'];
        this._summary = {
            targetEnvironment: this.flow === 'osio' ? 'os' : undefined,
            dependencyCheck: {
                projectName: (projectName !== undefined && projectName.length > 0) ? projectName : undefined
            },
            gitHubDetails: {}
        };
    };
    LauncherComponent.prototype.onInViewportChange = function ($event, id) {
        if ($event) {
            setTimeout(function () {
                // this._selectedSection = id;
            }, 10); // Avoids ExpressionChangedAfterItHasBeenCheckedError
        }
    };
    Object.defineProperty(LauncherComponent.prototype, "selectedSection", {
        // Accessors
        /**
         * Returns the current step ID
         *
         * @returns {string} The current step ID
         */
        get: function () {
            return this._selectedSection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "currentSelection", {
        /**
         * Returns current selection needed to restore upon a redirect
         *
         * @returns {Selection} The current selection
         */
        get: function () {
            var selection = {
                groupId: (this._summary.dependencyCheck !== undefined) ? this._summary.dependencyCheck.groupId : undefined,
                missionId: (this._summary.mission !== undefined) ? this._summary.mission.id : undefined,
                pipelineId: (this._summary.pipeline !== undefined) ? this._summary.pipeline.id : undefined,
                projectName: (this._summary.dependencyCheck !== undefined)
                    ? this._summary.dependencyCheck.projectName : undefined,
                projectVersion: (this._summary.dependencyCheck !== undefined)
                    ? this._summary.dependencyCheck.projectVersion : undefined,
                runtimeId: (this._summary.runtime !== undefined) ? this._summary.runtime.id : undefined,
                runtimeVersion: (this._summary.runtime !== undefined) ? this._summary.runtime.version : undefined,
                spacePath: (this._summary.dependencyCheck !== undefined) ? this._summary.dependencyCheck.spacePath : undefined,
                targetEnvironment: this._summary.targetEnvironment,
                cluster: this._summary.cluster,
                dependencyEditor: this._summary.dependencyEditor
            };
            return selection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "selectionParams", {
        /**
         * Returns current selection parameters, if any
         *
         * @returns {Selection} Current selection parameters or undefined
         */
        get: function () {
            var userSelection;
            var selection = this.getRequestParam('selection');
            if (selection !== null) {
                userSelection = JSON.parse(selection);
            }
            return userSelection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "showCancelOverlay", {
        /**
         * Returns flag indicating cancel overlay should be shown
         *
         * @returns {boolean} True if cancel overlay should be shown
         */
        get: function () {
            return this._showCancelOverlay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "showNextSteps", {
        /**
         * Returns flag indicating next steps should be shown
         *
         * @returns {boolean} True if the next steps should be shown
         */
        get: function () {
            return this.summaryCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "steps", {
        /**
         * Returns steps for this component
         *
         * @returns {LauncherStep[]} Steps for this component
         */
        get: function () {
            return this._steps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LauncherComponent.prototype, "summary", {
        /**
         * Returns summary, including full Mission and Runtime objects
         *
         * @returns {Summary} The current user summary
         */
        get: function () {
            return this._summary;
        },
        /**
         * Set user summary
         *
         * @param {Summary} val The current user summary
         */
        set: function (summary) {
            this._summary = summary;
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    /**
     * Add step
     *
     * @param {LauncherStepComponent} step
     */
    LauncherComponent.prototype.addStep = function (step) {
        for (var i = 0; i < this.steps.length; i++) {
            if (step.id === this.steps[i].id) {
                return;
            }
        }
        this.steps.push(step);
    };
    /**
     * Cancel has been selected
     */
    LauncherComponent.prototype.cancel = function () {
        this._showCancelOverlay = true;
    };
    /**
     * Cancel has been aborted
     */
    LauncherComponent.prototype.cancelAborted = function () {
        this._showCancelOverlay = false;
    };
    /**
     * Cancel has been confirmed
     */
    LauncherComponent.prototype.cancelConfirmed = function () {
        this._showCancelOverlay = false;
        this.onCancel.emit();
    };
    /**
     * Setup has completed
     */
    LauncherComponent.prototype.completed = function () {
        this.onComplete.emit();
    };
    /**
     * Get step for the given ID
     *
     * @param {string} id The step ID
     * @returns {Step} The step for the given ID
     */
    LauncherComponent.prototype.getStep = function (id) {
        var result;
        for (var i = 0; i < this.steps.length; i++) {
            var step = this.steps[i];
            if (id === step.id) {
                result = step;
                break;
            }
        }
        return result;
    };
    /**
     * Navigate to next step
     */
    LauncherComponent.prototype.navToNextStep = function (fromStepId) {
        var _this = this;
        if (fromStepId === void 0) { fromStepId = this.selectedSection; }
        var summaryStep = this.getStep('ProjectSummary');
        if (summaryStep !== undefined && summaryStep.completed === true) {
            this.summaryCompleted = true;
            return;
        }
        setTimeout(function () {
            _this.stepIndicator.navToNextStep(fromStepId);
        }, 10);
    };
    LauncherComponent.prototype.showStep = function (id) {
        this._selectedSection = id;
        switch (id) {
            case 'GitProvider':
                this.showGitProvider = true;
                this.showMissionRuntime = false;
                this.showProjectSummary = false;
                this.showReleaseStrategy = false;
                this.showSelectDependencies = false;
                this.showTargetEnvironment = false;
                break;
            case 'MissionRuntime':
                this.showGitProvider = false;
                this.showMissionRuntime = true;
                this.showProjectSummary = false;
                this.showReleaseStrategy = false;
                this.showSelectDependencies = false;
                this.showTargetEnvironment = false;
                break;
            case 'ProjectSummary':
                this.showGitProvider = false;
                this.showMissionRuntime = false;
                this.showProjectSummary = true;
                this.showReleaseStrategy = false;
                this.showSelectDependencies = false;
                this.showTargetEnvironment = false;
                break;
            case 'ReleaseStrategy':
                this.showGitProvider = false;
                this.showMissionRuntime = false;
                this.showProjectSummary = false;
                this.showReleaseStrategy = true;
                this.showSelectDependencies = false;
                this.showTargetEnvironment = false;
                break;
            case 'SelectDependencies':
                this.showGitProvider = false;
                this.showMissionRuntime = false;
                this.showProjectSummary = false;
                this.showReleaseStrategy = false;
                this.showSelectDependencies = true;
                this.showTargetEnvironment = false;
                break;
            case 'TargetEnvironment':
                this.showGitProvider = false;
                this.showMissionRuntime = false;
                this.showProjectSummary = false;
                this.showReleaseStrategy = false;
                this.showSelectDependencies = false;
                this.showTargetEnvironment = true;
                break;
            default:
                break;
        }
    };
    Object.defineProperty(LauncherComponent.prototype, "firstNonHiddenStep", {
        // Private
        get: function () {
            return this._steps.find(function (step) { return !step.hidden; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to retrieve request parameters
     *
     * @param name The request parameter to retrieve
     * @returns {any} The request parameter value or null
     */
    LauncherComponent.prototype.getRequestParam = function (name) {
        var search = (window.location.search !== undefined && window.location.search.length > 0)
            ? window.location.search : window.location.href;
        var param = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(search);
        if (param !== null) {
            return decodeURIComponent(param[1]);
        }
        return null;
    };
    LauncherComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher',
                    template: require('./launcher.component.html'),
                    styles: [require('./launcher.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    LauncherComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: Router, },
        { type: ProjectSummaryService, },
    ]; };
    LauncherComponent.propDecorators = {
        'importApp': [{ type: Input },],
        'flow': [{ type: Input },],
        'depEditorFlag': [{ type: Input },],
        'onCancel': [{ type: Output, args: ['onCancel',] },],
        'onComplete': [{ type: Output, args: ['onComplete',] },],
        'stepIndicator': [{ type: ViewChild, args: ['stepIndicator',] },],
    };
    __decorate([
        broadcast('viewApplicationButtonClicked', {}),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LauncherComponent.prototype, "completed", null);
    return LauncherComponent;
}());
export { LauncherComponent };
//# sourceMappingURL=launcher.component.js.map