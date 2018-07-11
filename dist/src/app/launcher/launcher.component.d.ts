import { AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Selection } from './model/selection.model';
import { Summary } from './model/summary.model';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { LauncherStep } from './launcher-step';
import { ProjectSummaryService } from './service/project-summary.service';
export declare class LauncherComponent implements AfterViewInit, OnInit {
    private route;
    private router;
    private projectSummaryService;
    /**
     * Flag indicating to show the import application work flow. Defaults to the create new application work flow.
     *
     * @type {boolean}
     */
    importApp: boolean;
    /**
     * Setting the flow to 'launch' will skip the pipeline step and show a cluster dropdown. Defaults to 'osio'.
     */
    flow: string;
    /**
     * Setting the flag to show dependency editor as internal feature
     */
    depEditorFlag: boolean;
    /**
     * The event emitted when an cancel has been selected
     */
    onCancel: EventEmitter<{}>;
    /**
     * The event emitted after setup has completed
     */
    onComplete: EventEmitter<{}>;
    stepIndicator: StepIndicatorComponent;
    statusLink: string;
    private _selectedSection;
    private _showCancelOverlay;
    private _steps;
    private _summary;
    private summaryCompleted;
    private showGitProvider;
    private showMissionRuntime;
    private showProjectSummary;
    private showReleaseStrategy;
    private showSelectDependencies;
    private showTargetEnvironment;
    constructor(route: ActivatedRoute, router: Router, projectSummaryService: ProjectSummaryService);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    onInViewportChange($event: any, id: string): void;
    /**
     * Returns the current step ID
     *
     * @returns {string} The current step ID
     */
    readonly selectedSection: string;
    /**
     * Returns current selection needed to restore upon a redirect
     *
     * @returns {Selection} The current selection
     */
    readonly currentSelection: Selection;
    /**
     * Returns current selection parameters, if any
     *
     * @returns {Selection} Current selection parameters or undefined
     */
    readonly selectionParams: Selection;
    /**
     * Returns flag indicating cancel overlay should be shown
     *
     * @returns {boolean} True if cancel overlay should be shown
     */
    readonly showCancelOverlay: boolean;
    /**
     * Returns flag indicating next steps should be shown
     *
     * @returns {boolean} True if the next steps should be shown
     */
    readonly showNextSteps: boolean;
    /**
     * Returns steps for this component
     *
     * @returns {LauncherStep[]} Steps for this component
     */
    readonly steps: LauncherStep[];
    /**
     * Returns summary, including full Mission and Runtime objects
     *
     * @returns {Summary} The current user summary
     */
    /**
     * Set user summary
     *
     * @param {Summary} val The current user summary
     */
    summary: Summary;
    /**
     * Add step
     *
     * @param {LauncherStepComponent} step
     */
    addStep(step: LauncherStep): void;
    /**
     * Cancel has been selected
     */
    cancel(): void;
    /**
     * Cancel has been aborted
     */
    cancelAborted(): void;
    /**
     * Cancel has been confirmed
     */
    cancelConfirmed(): void;
    /**
     * Setup has completed
     */
    completed(): void;
    /**
     * Get step for the given ID
     *
     * @param {string} id The step ID
     * @returns {Step} The step for the given ID
     */
    getStep(id: string): LauncherStep;
    /**
     * Navigate to next step
     */
    navToNextStep(fromStepId?: string): void;
    showStep(id: string): void;
    private readonly firstNonHiddenStep;
    /**
     * Helper to retrieve request parameters
     *
     * @param name The request parameter to retrieve
     * @returns {any} The request parameter value or null
     */
    private getRequestParam(name);
}
