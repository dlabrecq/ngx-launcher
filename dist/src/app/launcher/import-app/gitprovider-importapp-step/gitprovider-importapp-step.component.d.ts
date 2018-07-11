import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { GitProviderService } from '../../service/git-provider.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
export declare class GitproviderImportappStepComponent extends LauncherStep implements AfterViewInit, OnDestroy, OnInit {
    launcherComponent: LauncherComponent;
    private dependencyCheckService;
    private gitProviderService;
    form: NgForm;
    versionSelect: ElementRef;
    private subscriptions;
    private gitHubReposSubscription;
    constructor(launcherComponent: LauncherComponent, dependencyCheckService: DependencyCheckService, gitProviderService: GitProviderService);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
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
     * Authorize GitHub account
     *
     * @param {MouseEvent} $event
     */
    connectAccount($event: MouseEvent): void;
    /**
     * Ensure repo name is available for the selected organization
     */
    getGitHubRepos(): void;
    private getParams(selection);
    /**
     * Helper to retrieve request parameters
     *
     * @param name The request parameter to retrieve
     * @returns {any} The request parameter value or null
     */
    private getRequestParam(name);
}
