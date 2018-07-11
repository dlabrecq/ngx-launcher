import { DoCheck, KeyValueDiffers, OnDestroy, OnInit } from '@angular/core';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { DependencyEditorService } from '../../service/dependency-editor.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
export declare class DependencyEditorCreateappStepComponent extends LauncherStep implements OnInit, OnDestroy, DoCheck {
    launcherComponent: LauncherComponent;
    private depEditorService;
    private dependencyCheckService;
    private keyValueDiffers;
    id: string;
    github: string;
    gitref: string;
    boosterInfo: any;
    metadataInfo: any;
    blankResponse: any;
    private cacheInfo;
    private changes;
    private subscriptions;
    constructor(launcherComponent: LauncherComponent, depEditorService: DependencyEditorService, dependencyCheckService: DependencyCheckService, keyValueDiffers: KeyValueDiffers);
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    /**
     * Returns indicator that step is completed
     *
     * @returns {boolean} True if step is completed
     */
    readonly completed: boolean;
    /**
     * Returns target environments to display
     *
     * @returns {TargetEnvironment[]} The target environments to display
     */
    navToNextStep(): void;
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    navToStep(event: string): void;
    pickDependencies(event: any): void;
    pickMetadata(event: any): void;
    private listenForChanges(change);
    private handleBlankMissionFlow(runtimeId);
    private restoreSummary();
}
