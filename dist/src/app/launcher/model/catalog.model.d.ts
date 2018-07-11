export declare class CatalogMission {
    id: string;
    name: string;
    description: string;
    metadata?: any;
}
export declare class CatalogRuntimeVersion {
    id: string;
    name: string;
    metadata?: any;
}
export declare class CatalogRuntime {
    id: string;
    name: string;
    description?: string;
    icon: string;
    metadata?: any;
    versions: CatalogRuntimeVersion[];
}
export declare class CatalogBooster {
    mission: string;
    runtime: string;
    version: string;
    name: string;
    description?: string;
    metadata?: any;
    source?: any;
}
export declare class Catalog {
    missions: CatalogMission[];
    runtimes: CatalogRuntime[];
    boosters: CatalogBooster[];
}
