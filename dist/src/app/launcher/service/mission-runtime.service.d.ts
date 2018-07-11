import { Observable } from 'rxjs/Observable';
import { Catalog } from '../model/catalog.model';
import { Booster, BoosterVersion } from '../model/booster.model';
export declare enum EmptyReason {
    NOT_IMPLEMENTED = 0,
    CLUSTER_INCOMPATIBILITY = 1,
}
export declare class AvailableBoosters {
    empty: boolean;
    emptyReason?: EmptyReason;
    boosters: Booster[];
}
/**
 * Abstract mission runtime service provided to ensure consumer implements this pattern
 */
export declare abstract class MissionRuntimeService {
    static getAvailableBoosters(boosters: Booster[], cluster?: string, missionId?: string, runtimeId?: string, versionId?: string): AvailableBoosters;
    static compareVersions(a: BoosterVersion, b: BoosterVersion): number;
    private static checkRunsOnCluster(booster, cluster);
    private static createBoosters(catalog);
    getBoosters(): Observable<Booster[]>;
    abstract getCatalog(): Observable<Catalog>;
}
