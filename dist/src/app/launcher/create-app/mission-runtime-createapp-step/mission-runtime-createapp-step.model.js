var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as _ from 'lodash';
import { Mission } from '../../model/mission.model';
import { Runtime } from '../../model/runtime.model';
var ViewMission = /** @class */ (function (_super) {
    __extends(ViewMission, _super);
    function ViewMission() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showMore = false;
        _this.shrinked = false;
        return _this;
    }
    return ViewMission;
}(Mission));
export { ViewMission };
var ViewRuntime = /** @class */ (function (_super) {
    __extends(ViewRuntime, _super);
    function ViewRuntime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showMore = false;
        return _this;
    }
    return ViewRuntime;
}(Runtime));
export { ViewRuntime };
export function createViewMissions(boosters) {
    var groupedByMission = _.groupBy(boosters, function (b) { return b.mission.id; });
    return _.values(groupedByMission).map(function (missionBoosters) {
        var mission = _.first(missionBoosters).mission;
        return {
            id: mission.id,
            name: mission.name,
            description: mission.description,
            community: false,
            advanced: _.get(mission, 'metadata.level') === 'advanced' || _.get(mission, 'metadata.prerequisite', false),
            suggested: _.get(mission, 'metadata.suggested', false),
            showMore: false,
            disabled: true,
            boosters: missionBoosters
        };
    });
}
export function createViewRuntimes(boosters, canChangeVersion) {
    var groupedByRuntime = _.groupBy(boosters, function (b) { return b.runtime.id; });
    return _.values(groupedByRuntime).map(function (runtimeBoosters) {
        var runtime = _.first(runtimeBoosters).runtime;
        return {
            id: runtime.id,
            name: runtime.name,
            description: runtime.description,
            icon: runtime.icon,
            canChangeVersion: canChangeVersion,
            suggested: _.get(runtime, 'metadata.suggested', false),
            prerequisite: _.get(runtime, 'metadata.prerequisite', false),
            showMore: false,
            disabled: true,
            boosters: runtimeBoosters
        };
    });
}
//# sourceMappingURL=mission-runtime-createapp-step.model.js.map