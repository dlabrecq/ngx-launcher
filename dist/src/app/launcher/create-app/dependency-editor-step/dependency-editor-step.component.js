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
import { Component, Host, Input, KeyValueDiffers, Optional, ViewEncapsulation } from '@angular/core';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { DependencyEditorService } from '../../service/dependency-editor.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { DependencyEditor } from '../../model/dependency-editor/dependency-editor.model';
import { broadcast } from '../../shared/telemetry.decorator';
var DependencyEditorCreateappStepComponent = /** @class */ (function (_super) {
    __extends(DependencyEditorCreateappStepComponent, _super);
    function DependencyEditorCreateappStepComponent(launcherComponent, depEditorService, dependencyCheckService, keyValueDiffers) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.depEditorService = depEditorService;
        _this.dependencyCheckService = dependencyCheckService;
        _this.keyValueDiffers = keyValueDiffers;
        _this.github = '';
        _this.gitref = '';
        _this.boosterInfo = null;
        _this.metadataInfo = null;
        _this.blankResponse = null;
        _this.cacheInfo = {};
        _this.changes = {};
        _this.subscriptions = [];
        if (_this.launcherComponent.summary) {
            _this.launcherComponent.summary['dependencyEditor'] = new DependencyEditor();
        }
        return _this;
    }
    DependencyEditorCreateappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    DependencyEditorCreateappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.changes = this.keyValueDiffers.find(this.launcherComponent.summary).create(null);
        this.launcherComponent.addStep(this);
        this.dependencyCheckService.getDependencyCheck()
            .subscribe(function (val) {
            _this.metadataInfo = val;
        });
    };
    DependencyEditorCreateappStepComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var updates = this.changes.diff(this.launcherComponent.summary);
        if (updates) {
            updates.forEachChangedItem(function (r) {
                _this.listenForChanges(r);
            });
            updates.forEachAddedItem(function (r) {
                _this.listenForChanges(r);
            });
            updates.forEachRemovedItem(function (r) {
                _this.listenForChanges(r);
            });
        }
    };
    Object.defineProperty(DependencyEditorCreateappStepComponent.prototype, "completed", {
        // Accessors
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            return (this.launcherComponent.summary.dependencyEditor !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns target environments to display
     *
     * @returns {TargetEnvironment[]} The target environments to display
     */
    // Steps
    DependencyEditorCreateappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('SelectDependencies');
    };
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    DependencyEditorCreateappStepComponent.prototype.navToStep = function (event) {
        this.launcherComponent.stepIndicator.navToStep(event);
    };
    DependencyEditorCreateappStepComponent.prototype.pickDependencies = function (event) {
        if (event) {
            this.launcherComponent.summary.dependencyEditor['dependencySnapshot'] = event;
        }
    };
    DependencyEditorCreateappStepComponent.prototype.pickMetadata = function (event) {
        if (event) {
            this.launcherComponent.summary.dependencyCheck.mavenArtifact = event.artifactId;
            this.launcherComponent.summary.dependencyCheck.groupId = event.groupId;
            this.launcherComponent.summary.dependencyCheck.projectVersion = event.version;
            // Update the dependency editor model
            this.launcherComponent.summary.dependencyEditor['mavenArtifact'] = event.artifactId;
            this.launcherComponent.summary.dependencyEditor['groupId'] = event.groupId;
            this.launcherComponent.summary.dependencyEditor['projectVersion'] = event.version;
        }
    };
    DependencyEditorCreateappStepComponent.prototype.listenForChanges = function (change) {
        var _this = this;
        var flag = false;
        var current = change.currentValue;
        if (!current) {
            return;
        }
        if (change && change.key === 'runtime') {
            if (!this.cacheInfo ||
                (this.cacheInfo && this.cacheInfo.id !== current.id)) {
                // Changes in any of them: name or version.id or version.name
                this.cacheInfo['runtime'] = {
                    name: current.name,
                    id: current.id,
                    missions: current.missions,
                    version: current.version ? current.version.id : null
                };
                flag = true;
            }
        }
        else if (change && change.key === 'mission') {
            this.cacheInfo['mission'] = {
                id: current.id
            };
            // If runtime is selected first, version of runtime will be null. This updates that.
            var missionsArrFromRuntime = this.cacheInfo['runtime'] && this.cacheInfo['runtime']['missions'];
            if (missionsArrFromRuntime && missionsArrFromRuntime.length) {
                var filteredMission = missionsArrFromRuntime.filter(function (mission) { return mission.id === _this.cacheInfo['mission']['id']; })[0];
                this.cacheInfo['runtime']['version'] =
                    filteredMission && filteredMission.versions && filteredMission.versions[0]
                        && filteredMission.versions[0].id || null;
            }
            flag = true;
        }
        if (flag) {
            if (this.cacheInfo['mission'] && this.cacheInfo['runtime']) {
                // this.cacheInfo = JSON.parse(this.cacheInfo);
                this.boosterInfo = this.cacheInfo;
                if (this.cacheInfo['mission'].id === 'blank-mission') {
                    this.handleBlankMissionFlow(this.cacheInfo['runtime'].id);
                    return;
                }
                this.blankResponse = null;
                var mission_1 = this.cacheInfo['mission'].id;
                var runtime_1 = this.cacheInfo['runtime'].id;
                var runtimeVersion = this.cacheInfo['runtime'].version;
                this.boosterInfo = this.cacheInfo;
                var missionObj = this.launcherComponent.summary.mission;
                if (missionObj && missionObj['boosters'] && missionObj['boosters'].length) {
                    missionObj['boosters'].forEach(function (booster) {
                        if (mission_1 === booster.mission.id && runtime_1 === booster.runtime.id) {
                            _this.github = booster.source.git.url;
                            _this.gitref = booster.source.git.ref;
                        }
                    });
                }
            }
        }
    };
    DependencyEditorCreateappStepComponent.prototype.handleBlankMissionFlow = function (runtimeId) {
        var _this = this;
        if (runtimeId) {
            var service = this.depEditorService.getCoreDependencies(runtimeId);
            if (service) {
                service.subscribe(function (response) {
                    if (response) {
                        _this.blankResponse = response;
                    }
                });
            }
        }
    };
    // Restore mission & runtime summary
    DependencyEditorCreateappStepComponent.prototype.restoreSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (selection !== undefined) {
            this.launcherComponent.summary.targetEnvironment = selection.targetEnvironment;
            this.launcherComponent.summary.dependencyCheck = selection.dependencyCheck;
            this.launcherComponent.summary.dependencyEditor = selection.dependencyEditor;
        }
    };
    DependencyEditorCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-dependencychecker-createapp-step',
                    template: require('./dependency-editor-step.component.html'),
                    styles: [require('./dependency-editor-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    DependencyEditorCreateappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: DependencyEditorService, decorators: [{ type: Optional },] },
        { type: DependencyCheckService, },
        { type: KeyValueDiffers, },
    ]; };
    DependencyEditorCreateappStepComponent.propDecorators = {
        'id': [{ type: Input },],
    };
    __decorate([
        broadcast('completeDependencyEditorStep', {
            'launcherComponent.summary.dependencyEditor': {
                dependencySnapshot: 'dependencySnapshot'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DependencyEditorCreateappStepComponent.prototype, "navToNextStep", null);
    return DependencyEditorCreateappStepComponent;
}(LauncherStep));
export { DependencyEditorCreateappStepComponent };
//# sourceMappingURL=dependency-editor-step.component.js.map