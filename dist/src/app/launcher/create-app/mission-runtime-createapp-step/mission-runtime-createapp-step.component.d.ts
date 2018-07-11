import { OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Broadcaster } from 'ngx-base';
import { MissionRuntimeService } from '../../service/mission-runtime.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { BoosterVersion } from '../../model/booster.model';
import { ViewMission, ViewRuntime } from './mission-runtime-createapp-step.model';
export declare class MissionRuntimeCreateappStepComponent extends LauncherStep implements OnInit, OnDestroy {
    launcherComponent: LauncherComponent;
    private missionRuntimeService;
    _DomSanitizer: DomSanitizer;
    private broadcaster;
    missionId: string;
    runtimeId: string;
    private disabledReason;
    private _missions;
    private _runtimes;
    private _boosters;
    private _cluster;
    private versionId;
    private subscriptions;
    constructor(launcherComponent: LauncherComponent, missionRuntimeService: MissionRuntimeService, _DomSanitizer: DomSanitizer, broadcaster: Broadcaster);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initBoosters(): void;
    /**
     * Returns a list of missions to display
     *
     * @returns {Mission[]} The missions to display
     */
    readonly missions: ViewMission[];
    /**
     * Returns a list of runtimes to display
     *
     * @returns {Runtime[]} The runtimes to display
     */
    readonly runtimes: ViewRuntime[];
    readonly cluster: string;
    /**
     * Returns indicator for at least one selection has been made
     *
     * @returns {boolean} True at least one selection has been made
     */
    readonly selectionAvailable: boolean;
    /**
     * Returns indicator that step is completed
     *
     * @returns {boolean} True if step is completed
     */
    readonly completed: boolean;
    /**
     * Navigate to next step
     */
    navToNextStep(): void;
    showStep(id: string, reset: boolean): void;
    /**
     * Reset current selections
     */
    resetSelections(): void;
    selectBooster(mission?: ViewMission, runtime?: ViewRuntime, version?: BoosterVersion): void;
    handleBlankMissionFlow(): void;
    private createMavenArtifact();
    private restoreFromSummary();
    private getSelectedCluster();
    private updateBoosterViewStatus();
    private getRuntimeSelectedVersion(runtimeId, versions);
    private clearRuntime();
    private clearMission();
}
