import * as _ from 'lodash';
export var EmptyReason;
(function (EmptyReason) {
    EmptyReason[EmptyReason["NOT_IMPLEMENTED"] = 0] = "NOT_IMPLEMENTED";
    EmptyReason[EmptyReason["CLUSTER_INCOMPATIBILITY"] = 1] = "CLUSTER_INCOMPATIBILITY";
})(EmptyReason || (EmptyReason = {}));
var AvailableBoosters = /** @class */ (function () {
    function AvailableBoosters() {
    }
    return AvailableBoosters;
}());
export { AvailableBoosters };
/**
 * Abstract mission runtime service provided to ensure consumer implements this pattern
 */
var MissionRuntimeService = /** @class */ (function () {
    function MissionRuntimeService() {
    }
    MissionRuntimeService.getAvailableBoosters = function (boosters, cluster, missionId, runtimeId, versionId) {
        var availableBoosters = boosters.filter(function (b) {
            return (!missionId || b.mission.id === missionId)
                && (!runtimeId || b.runtime.id === runtimeId)
                && (!versionId || b.version.id === versionId);
        });
        if (availableBoosters.length === 0) {
            return { empty: true, emptyReason: EmptyReason.NOT_IMPLEMENTED, boosters: [] };
        }
        if (!cluster) {
            return { empty: false, boosters: availableBoosters };
        }
        var boostersRunningOnCluster = availableBoosters.filter(function (b) {
            return MissionRuntimeService.checkRunsOnCluster(b, cluster);
        });
        if (boostersRunningOnCluster.length === 0) {
            return { empty: true, emptyReason: EmptyReason.CLUSTER_INCOMPATIBILITY, boosters: [] };
        }
        return { empty: false, boosters: boostersRunningOnCluster };
    };
    MissionRuntimeService.compareVersions = function (a, b) {
        var aSuggested = _.get(a, 'metadata.suggested', false);
        var bSuggested = _.get(b, 'metadata.suggested', false);
        if (aSuggested !== bSuggested) {
            return aSuggested ? -1 : 1;
        }
        // TODO remove this 'community' hook mainteners should use suggested field
        var aCommunity = a.id.indexOf('community') >= 0;
        var bCommunity = b.id.indexOf('community') >= 0;
        if (aCommunity !== bCommunity) {
            return aCommunity ? -1 : 1;
        }
        return -1 * a.id.localeCompare(b.id);
    };
    MissionRuntimeService.checkRunsOnCluster = function (booster, cluster) {
        var defaultResult = true;
        var runsOn = _.get(booster, 'metadata.app.launcher.runsOn');
        if (typeof runsOn === 'string') {
            runsOn = [runsOn];
        }
        if (runsOn && runsOn.length !== 0) {
            for (var i = 0; i < runsOn.length; i++) {
                var supportedCategory = runsOn[i];
                if (!supportedCategory.startsWith('!')) {
                    defaultResult = false;
                }
                if (supportedCategory.toLowerCase() === 'all'
                    || supportedCategory.toLowerCase() === '*'
                    || supportedCategory.toLocaleLowerCase() === cluster) {
                    return true;
                }
                else if (supportedCategory.toLowerCase() === 'none'
                    || supportedCategory.toLowerCase() === '!*'
                    || supportedCategory.toLowerCase() === ('!' + cluster)) {
                    return false;
                }
            }
        }
        return defaultResult;
    };
    MissionRuntimeService.createBoosters = function (catalog) {
        var missionById = _.keyBy(catalog.missions, 'id');
        var runtimeById = _.keyBy(catalog.runtimes, 'id');
        return catalog.boosters.map(function (b) {
            var runtime = runtimeById[b.runtime];
            var mission = missionById[b.mission];
            if (!mission || !runtime) {
                throw new Error("Invalid catalog booster: " + JSON.stringify(b));
            }
            return {
                name: b.name,
                description: b.description,
                metadata: b.metadata,
                mission: mission,
                runtime: runtime,
                source: b.source,
                version: runtime.versions.find(function (v) { return v.id === b.version; })
            };
        });
    };
    MissionRuntimeService.prototype.getBoosters = function () {
        return this.getCatalog()
            .map(function (c) { return MissionRuntimeService.createBoosters(c); });
    };
    return MissionRuntimeService;
}());
export { MissionRuntimeService };
//# sourceMappingURL=mission-runtime.service.js.map