import { OnInit } from '@angular/core';
import { LauncherComponent } from '../launcher.component';
import { DependencyCheckService } from '../service/dependency-check.service';
export declare class StepIndicatorComponent implements OnInit {
    launcherComponent: LauncherComponent;
    private dependencyCheckService;
    /**
     * Show appropriate style while steps are in progress of being shown
     *
     * @type {boolean}
     */
    inProgress: boolean;
    constructor(launcherComponent: LauncherComponent, dependencyCheckService: DependencyCheckService);
    ngOnInit(): void;
    /**
     * Navigate to next step
     */
    navToNextStep(fromStepId?: string): void;
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    navToStep(id: string): void;
    broadcastEvent(): void;
    private restoreSummary();
}
