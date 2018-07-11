import { OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Broadcaster } from 'ngx-base';
import { TargetEnvironment } from '../../model/target-environment.model';
import { TargetEnvironmentService } from '../../service/target-environment.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { Cluster } from '../../model/cluster.model';
import { TokenService } from '../../service/token.service';
export declare class TargetEnvironmentCreateappStepComponent extends LauncherStep implements OnDestroy {
    launcherComponent: LauncherComponent;
    private targetEnvironmentService;
    private tokenService;
    private broadcaster;
    _DomSanitizer: DomSanitizer;
    id: string;
    private subscriptions;
    private _targetEnvironments;
    private _clusters;
    constructor(launcherComponent: LauncherComponent, targetEnvironmentService: TargetEnvironmentService, tokenService: TokenService, broadcaster: Broadcaster, _DomSanitizer: DomSanitizer);
    ngOnDestroy(): void;
    ngOnInit(): void;
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
    readonly targetEnvironments: TargetEnvironment[];
    /**
     * Returns clusters to display
     *
     * @returns {Cluster[]} The clusters to display
     */
    readonly clusters: Cluster[];
    navToNextStep(): void;
    showStep(id: string, reset: boolean): void;
    selectCluster(cluster?: Cluster): void;
    updateTargetEnvSelection(target: TargetEnvironment): void;
    private restoreSummary();
    private clusterSortFn(a, b);
}
