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
import { Component, Host, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { defaults } from 'lodash';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { ProjectSummaryService } from '../../service/project-summary.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { broadcast } from '../../shared/telemetry.decorator';
var ProjectSummaryImportappStepComponent = /** @class */ (function (_super) {
    __extends(ProjectSummaryImportappStepComponent, _super);
    function ProjectSummaryImportappStepComponent(launcherComponent, dependencyCheckService, projectSummaryService, _DomSanitizer) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.dependencyCheckService = dependencyCheckService;
        _this.projectSummaryService = projectSummaryService;
        _this._DomSanitizer = _DomSanitizer;
        _this.setUpErrResponse = [];
        _this.showAppNameInput = false;
        _this.subscriptions = [];
        return _this;
    }
    ProjectSummaryImportappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        this.restoreSummary();
        this.subscriptions.push(this.dependencyCheckService.getDependencyCheck()
            .subscribe(function (val) {
            // Don't override user's application name
            defaults(_this.launcherComponent.summary.dependencyCheck, val);
        }));
    };
    ProjectSummaryImportappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(ProjectSummaryImportappStepComponent.prototype, "applicationName", {
        // Accessors
        get: function () {
            return (this.dependencyCheck.projectName !== undefined) ? this.dependencyCheck.projectName : 'New Application';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSummaryImportappStepComponent.prototype, "completed", {
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            if (this.launcherComponent.selectedSection !== 'ProjectSummary' || this.form.invalid) {
                return false;
            }
            for (var i = 0; i < this.launcherComponent.steps.length - 1; i++) {
                var step = this.launcherComponent.steps[i];
                if (!(step.optional === true || step.completed === true) && step.hidden !== true) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    /**
     * Navigate to next step
     */
    ProjectSummaryImportappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('ProjectSummary');
    };
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    ProjectSummaryImportappStepComponent.prototype.navToStep = function (id) {
        this.launcherComponent.stepIndicator.navToStep(id);
    };
    ProjectSummaryImportappStepComponent.prototype.showStep = function (id) {
        this.launcherComponent.showStep(id);
    };
    /**
     * Set up this application
     */
    ProjectSummaryImportappStepComponent.prototype.setup = function () {
        var _this = this;
        this.subscriptions.push(this.projectSummaryService
            .setup(this.launcherComponent.summary)
            .subscribe(function (val) {
            if (val && val['uuid_link']) {
                _this.launcherComponent.statusLink = val['uuid_link'];
                _this.navToNextStep();
            }
        }, function (error) {
            if (error) {
                _this.displaySetUpErrorResponse(error);
            }
            console.log('error in setup: Import', error);
        }));
    };
    Object.defineProperty(ProjectSummaryImportappStepComponent.prototype, "dependencyCheck", {
        get: function () {
            return this.launcherComponent.summary.dependencyCheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSummaryImportappStepComponent.prototype, "summary", {
        get: function () {
            return this.launcherComponent.summary;
        },
        enumerable: true,
        configurable: true
    });
    // Private
    // Restore mission & runtime summary
    ProjectSummaryImportappStepComponent.prototype.restoreSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (selection === undefined) {
            return;
        }
        this.launcherComponent.summary.dependencyCheck.groupId = selection.groupId;
        this.launcherComponent.summary.dependencyCheck.projectName = selection.projectName;
        this.launcherComponent.summary.dependencyCheck.projectVersion = selection.projectVersion;
        this.launcherComponent.summary.dependencyCheck.spacePath = selection.spacePath;
    };
    ProjectSummaryImportappStepComponent.prototype.hideAppNameEdit = function () {
        this.dependencyCheck.projectName = this.savedProjectName;
        this.showAppNameInput = false;
    };
    ProjectSummaryImportappStepComponent.prototype.showAppNameEdit = function () {
        this.savedProjectName = this.dependencyCheck.projectName;
        this.showAppNameInput = true;
    };
    ProjectSummaryImportappStepComponent.prototype.toggleExpanded = function (pipeline) {
        pipeline.expanded = (pipeline.expanded !== undefined) ? !pipeline.expanded : true;
    };
    /**
     * displaySetUpErrorResponse - takes a message string and returns nothing
     * Displays the response received from the setup in case of error
     */
    ProjectSummaryImportappStepComponent.prototype.displaySetUpErrorResponse = function (err) {
        var notification = {
            iconClass: 'pficon-error-circle-o',
            alertClass: 'alert-danger',
            text: err
        };
        this.setUpErrResponse.push(notification);
    };
    ProjectSummaryImportappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-projectsummary-importapp-step',
                    template: require('./project-summary-importapp-step.component.html'),
                    styles: [require('./project-summary-importapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ProjectSummaryImportappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: DependencyCheckService, },
        { type: ProjectSummaryService, },
        { type: DomSanitizer, },
    ]; };
    ProjectSummaryImportappStepComponent.propDecorators = {
        'form': [{ type: ViewChild, args: ['form',] },],
        'id': [{ type: Input },],
    };
    __decorate([
        broadcast('completeSummaryStep_Import', {
            'launcherComponent.summary': {
                location: 'gitHubDetails.organization',
                pipeline: 'pipeline.name',
                projectName: 'dependencyCheck.projectName',
                repository: 'gitHubDetails.repository',
                spacePath: 'dependencyCheck.spacePath',
                username: 'gitHubDetails.login'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProjectSummaryImportappStepComponent.prototype, "setup", null);
    return ProjectSummaryImportappStepComponent;
}(LauncherStep));
export { ProjectSummaryImportappStepComponent };
//# sourceMappingURL=project-summary-importapp-step.component.js.map