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
import { Component, Host, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { Broadcaster } from 'ngx-base';
import { EmptyReason, MissionRuntimeService } from '../../service/mission-runtime.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { createViewMissions, createViewRuntimes } from './mission-runtime-createapp-step.model';
import { broadcast } from '../../shared/telemetry.decorator';
var MissionRuntimeCreateappStepComponent = /** @class */ (function (_super) {
    __extends(MissionRuntimeCreateappStepComponent, _super);
    function MissionRuntimeCreateappStepComponent(launcherComponent, missionRuntimeService, _DomSanitizer, broadcaster) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.missionRuntimeService = missionRuntimeService;
        _this._DomSanitizer = _DomSanitizer;
        _this.broadcaster = broadcaster;
        _this.disabledReason = EmptyReason;
        _this._missions = [];
        _this._runtimes = [];
        _this._boosters = null;
        _this.subscriptions = [];
        return _this;
    }
    MissionRuntimeCreateappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        this.subscriptions.push(this.missionRuntimeService.getBoosters()
            .subscribe(function (boosters) {
            _this._boosters = boosters;
            _this.initBoosters();
            _this.restoreFromSummary();
        }));
        this.subscriptions.push(this.broadcaster.on('cluster').subscribe(function () { return _this.initBoosters(); }));
    };
    MissionRuntimeCreateappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    MissionRuntimeCreateappStepComponent.prototype.initBoosters = function () {
        this._runtimes = createViewRuntimes(this._boosters, this.launcherComponent.flow === 'launch');
        this._missions = createViewMissions(this._boosters);
        this.updateBoosterViewStatus();
    };
    Object.defineProperty(MissionRuntimeCreateappStepComponent.prototype, "missions", {
        // Accessors
        /**
         * Returns a list of missions to display
         *
         * @returns {Mission[]} The missions to display
         */
        get: function () {
            return this._missions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionRuntimeCreateappStepComponent.prototype, "runtimes", {
        /**
         * Returns a list of runtimes to display
         *
         * @returns {Runtime[]} The runtimes to display
         */
        get: function () {
            return this._runtimes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionRuntimeCreateappStepComponent.prototype, "cluster", {
        get: function () {
            return this._cluster;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionRuntimeCreateappStepComponent.prototype, "selectionAvailable", {
        /**
         * Returns indicator for at least one selection has been made
         *
         * @returns {boolean} True at least one selection has been made
         */
        get: function () {
            return (this.launcherComponent.summary.mission !== undefined
                || this.launcherComponent.summary.runtime !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionRuntimeCreateappStepComponent.prototype, "completed", {
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            return (this.launcherComponent.summary.mission !== undefined
                && this.launcherComponent.summary.runtime !== undefined
                && this.launcherComponent.summary.runtime.version !== undefined);
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    /**
     * Navigate to next step
     */
    MissionRuntimeCreateappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('MissionRuntime');
    };
    MissionRuntimeCreateappStepComponent.prototype.showStep = function (id, reset) {
        if (reset) {
            this.resetSelections();
        }
        this.launcherComponent.showStep(id);
    };
    /**
     * Reset current selections
     */
    MissionRuntimeCreateappStepComponent.prototype.resetSelections = function () {
        this.clearMission();
        this.clearRuntime();
        this.updateBoosterViewStatus();
    };
    MissionRuntimeCreateappStepComponent.prototype.selectBooster = function (mission, runtime, version) {
        if (mission && !mission.disabled) {
            this.missionId = mission.id;
            this.launcherComponent.summary.mission = mission;
        }
        if (runtime && !runtime.disabled) {
            this.runtimeId = runtime.id;
            var newVersion = version ? version : runtime.selectedVersion;
            this.versionId = newVersion.id;
            this.launcherComponent.summary.runtime = runtime;
            this.launcherComponent.summary.runtime.version = newVersion;
            // FIXME: use a booster change event listener to do this
            // set maven artifact
            if (this.launcherComponent.flow === 'osio' && this.completed) {
                this.launcherComponent.summary.dependencyCheck.mavenArtifact = this.createMavenArtifact();
            }
        }
        this.handleBlankMissionFlow();
        this.updateBoosterViewStatus();
    };
    MissionRuntimeCreateappStepComponent.prototype.handleBlankMissionFlow = function () {
        if (this.launcherComponent.summary.mission && this.launcherComponent.summary.runtime &&
            this.launcherComponent.summary.mission.id === 'blank-mission') {
            var runtimeSp = this.launcherComponent.summary.runtime;
            if (runtimeSp && runtimeSp.boosters && runtimeSp.boosters.length > 0) {
                var supportedMission = runtimeSp.boosters[0];
                this.launcherComponent.summary.mission.meta = supportedMission.mission.id;
            }
        }
    };
    // Private
    MissionRuntimeCreateappStepComponent.prototype.createMavenArtifact = function () {
        var artifactTS = Date.now();
        var artifactRuntime = this.launcherComponent.summary.runtime.id.replace(/[.\-_]/g, '');
        var artifactMission = this.launcherComponent.summary.mission.id.replace(/[.\-_]/g, '');
        return "booster-" + artifactMission + "-" + artifactRuntime + "-" + artifactTS;
    };
    MissionRuntimeCreateappStepComponent.prototype.restoreFromSummary = function () {
        var selection = this.launcherComponent.selectionParams;
        if (!selection) {
            return;
        }
        var mission = this.missions.find(function (m) { return m.id === selection.missionId; });
        var runtime = this.runtimes.find(function (r) { return r.id === selection.runtimeId; });
        this.selectBooster(mission, runtime, selection.runtimeVersion);
    };
    MissionRuntimeCreateappStepComponent.prototype.getSelectedCluster = function () {
        if (this.launcherComponent.summary.targetEnvironment === 'os') {
            return _.get(this.launcherComponent.summary, 'cluster.type');
        }
        return null;
    };
    MissionRuntimeCreateappStepComponent.prototype.updateBoosterViewStatus = function () {
        var _this = this;
        this._cluster = this.getSelectedCluster();
        this._missions.forEach(function (mission) {
            if (mission.id !== 'blank-mission') {
                var availableBoosters = MissionRuntimeService.getAvailableBoosters(mission.boosters, _this._cluster, mission.id);
                if (availableBoosters.empty) {
                    mission.shrinked = true;
                }
                else {
                    availableBoosters = MissionRuntimeService.getAvailableBoosters(mission.boosters, _this._cluster, mission.id, _this.runtimeId, _this.versionId);
                }
                mission.disabled = availableBoosters.empty;
                mission.disabledReason = availableBoosters.emptyReason;
                mission.community = _this.launcherComponent.flow === 'osio'
                    && !mission.disabled && _this.versionId === 'community';
                if (_this.missionId === mission.id && availableBoosters.empty) {
                    _this.clearMission();
                }
            }
        });
        this._runtimes.forEach(function (runtime) {
            var availableBoosters = MissionRuntimeService.getAvailableBoosters(runtime.boosters, _this._cluster, _this.missionId, runtime.id);
            var versions = _.chain(availableBoosters.boosters)
                .map(function (b) { return b.version; })
                .uniq()
                .value()
                .sort(MissionRuntimeService.compareVersions);
            if (_this.runtimeId === runtime.id && availableBoosters.empty) {
                _this.clearRuntime();
            }
            runtime.disabled = availableBoosters.empty;
            runtime.disabledReason = availableBoosters.emptyReason;
            runtime.versions = versions;
            runtime.selectedVersion = _this.getRuntimeSelectedVersion(runtime.id, versions);
        });
    };
    MissionRuntimeCreateappStepComponent.prototype.getRuntimeSelectedVersion = function (runtimeId, versions) {
        var _this = this;
        if (this.runtimeId === runtimeId && this.versionId) {
            var selectedVersion = versions.find(function (v) { return v.id === _this.versionId; });
            if (selectedVersion) {
                return selectedVersion;
            }
            // Reset selected runtime and version since it is not available
            this.clearRuntime();
        }
        return _.first(versions);
    };
    MissionRuntimeCreateappStepComponent.prototype.clearRuntime = function () {
        this.runtimeId = undefined;
        this.versionId = undefined;
        this.launcherComponent.summary.runtime = undefined;
    };
    MissionRuntimeCreateappStepComponent.prototype.clearMission = function () {
        this.missionId = undefined;
        this.launcherComponent.summary.mission = undefined;
    };
    MissionRuntimeCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-missionruntime-createapp-step',
                    template: require('./mission-runtime-createapp-step.component.html'),
                    styles: [require('./mission-runtime-createapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    MissionRuntimeCreateappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: MissionRuntimeService, },
        { type: DomSanitizer, },
        { type: Broadcaster, },
    ]; };
    __decorate([
        broadcast('completeMissionRuntimeStep', {
            'launcherComponent.summary': {
                mission: 'mission.name',
                runtime: 'runtime.name'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MissionRuntimeCreateappStepComponent.prototype, "navToNextStep", null);
    return MissionRuntimeCreateappStepComponent;
}(LauncherStep));
export { MissionRuntimeCreateappStepComponent };
//# sourceMappingURL=mission-runtime-createapp-step.component.js.map