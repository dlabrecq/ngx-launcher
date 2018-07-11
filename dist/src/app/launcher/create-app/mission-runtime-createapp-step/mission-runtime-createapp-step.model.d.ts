import { Mission } from '../../model/mission.model';
import { Runtime } from '../../model/runtime.model';
import { Booster, BoosterVersion } from '../../model/booster.model';
import { EmptyReason } from '../../service/mission-runtime.service';
export declare class ViewMission extends Mission {
    advanced: boolean;
    suggested: boolean;
    disabled: boolean;
    disabledReason?: EmptyReason;
    prerequisite: boolean;
    community: boolean;
    showMore: boolean;
    shrinked: boolean;
    boosters: Booster[];
}
export declare class ViewRuntime extends Runtime {
    disabled: boolean;
    disabledReason?: EmptyReason;
    prerequisite: boolean;
    canChangeVersion: boolean;
    suggested: boolean;
    selectedVersion: {
        id: string;
        name: string;
    };
    versions: BoosterVersion[];
    showMore: boolean;
    boosters: Booster[];
}
export declare function createViewMissions(boosters: Booster[]): ViewMission[];
export declare function createViewRuntimes(boosters: Booster[], canChangeVersion: boolean): ViewRuntime[];
