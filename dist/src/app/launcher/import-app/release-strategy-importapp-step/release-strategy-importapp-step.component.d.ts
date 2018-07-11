import { OnDestroy, OnInit } from '@angular/core';
import { Filter, FilterEvent } from 'patternfly-ng/filter';
import { SortEvent } from 'patternfly-ng/sort';
import { ToolbarConfig } from 'patternfly-ng/toolbar';
import { PipelineService } from '../../service/pipeline.service';
import { Pipeline } from '../../model/pipeline.model';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
export declare class ReleaseStrategyImportappStepComponent extends LauncherStep implements OnInit, OnDestroy {
    launcherComponent: LauncherComponent;
    private pipelineService;
    id: string;
    optional: boolean;
    toolbarConfig: ToolbarConfig;
    private allPipelines;
    private filterConfig;
    private isAscendingSort;
    private _pipelines;
    private _pipelineId;
    private sortConfig;
    private currentSortField;
    private subscriptions;
    constructor(launcherComponent: LauncherComponent, pipelineService: PipelineService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Returns a list of pipelines to display
     *
     * @returns {Pipeline[]} The list of pipelines
     */
    readonly pipelines: Pipeline[];
    /**
     * Returns pipeline ID
     *
     * @returns {string} The pipeline ID
     */
    /**
     * Set the pipeline ID
     *
     * @param {string} val The pipeline ID
     */
    pipelineId: string;
    /**
     * Returns indicator that step is completed
     *
     * @returns {boolean} True if step is completed
     */
    readonly completed: boolean;
    applyFilters(filters: Filter[]): void;
    filterChanged($event: FilterEvent): void;
    matchesFilter(item: any, filter: Filter): boolean;
    matchesFilters(item: any, filters: Filter[]): boolean;
    compare(item1: any, item2: any): number;
    sortChanged($event: SortEvent): void;
    navToNextStep(): void;
    showStep(id: string, reset: boolean): void;
    updatePipelineSelection(pipeline: Pipeline): void;
    private restoreSummary();
    private toggleExpanded(pipeline);
}
