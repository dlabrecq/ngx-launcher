export declare class BoosterVersion {
    id: string;
    name: string;
    metadata?: any;
}
export declare class BoosterRuntime {
    id: string;
    name: string;
    description?: string;
    metadata?: any;
    icon: string;
}
export declare class BoosterMission {
    id: string;
    name: string;
    description?: string;
    metadata?: any;
}
export declare class Booster {
    name: string;
    description?: string;
    metadata?: any;
    mission: BoosterMission;
    runtime: BoosterRuntime;
    version: BoosterVersion;
}
