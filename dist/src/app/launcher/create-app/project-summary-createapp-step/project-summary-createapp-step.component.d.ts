import { OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { ProjectSummaryService } from '../../service/project-summary.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { DependencyCheck } from '../../model/dependency-check.model';
import { Summary } from '../../model/summary.model';
import { NgForm } from '@angular/forms';
export declare class ProjectSummaryCreateappStepComponent extends LauncherStep implements OnDestroy, OnInit {
    launcherComponent: LauncherComponent;
    private dependencyCheckService;
    private projectSummaryService;
    _DomSanitizer: DomSanitizer;
    form: NgForm;
    id: string;
    depEditorFlag: boolean;
    setUpErrResponse: Array<any>;
    savedProjectName: string;
    showAppNameInput: boolean;
    private subscriptions;
    constructor(launcherComponent: LauncherComponent, dependencyCheckService: DependencyCheckService, projectSummaryService: ProjectSummaryService, _DomSanitizer: DomSanitizer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly applicationName: string;
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
    /**
     * Navigate to step
     *
     * @param {string} id The step ID
     */
    navToStep(id: string): void;
    showStep(id: string): void;
    /**
     * Set up this application
     */
    setup(): void;
    readonly dependencyCheck: DependencyCheck;
    readonly summary: Summary;
    private restoreSummary();
    private hideAppNameEdit();
    private showAppNameEdit();
    private toggleExpanded(pipeline);
    /**
     * displaySetUpErrorResponse - takes a message string and returns nothing
     * Displays the response received from the setup in case of error
     */
    private displaySetUpErrorResponse(err);
}
