import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Cluster } from '../../model/cluster.model';
import { TokenService } from '../../service/token.service';
export declare class LinkAccountsCreateappStepComponent {
    private tokenService;
    private changeDetector;
    select: EventEmitter<{}>;
    private _clusters;
    private clusterId;
    constructor(tokenService: TokenService, changeDetector: ChangeDetectorRef);
    selectCluster(cluster: Cluster): void;
    clusters: Cluster[];
    private autoSetCluster();
}
