import { OnDestroy, OnInit } from '@angular/core';
import { PipelineService } from '../../service/pipeline.service';
import { Pipeline } from '../../model/pipeline.model';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
export declare class ReleaseStrategyCreateappStepComponent extends LauncherStep implements OnInit, OnDestroy {
    launcherComponent: LauncherComponent;
    private pipelineService;
    id: string;
    private _pipelines;
    private _pipelineId;
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
    navToNextStep(): void;
    showStep(id: string, reset: boolean): void;
    updatePipelineSelection(pipeline: Pipeline): void;
    private restoreSummary();
    private toggleExpanded(pipeline);
}
