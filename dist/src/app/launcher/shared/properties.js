import * as _ from 'lodash';
var PropertiesGetter = /** @class */ (function () {
    function PropertiesGetter(object, args) {
        if (args === void 0) { args = []; }
        this.object = object;
        this.args = args;
        this.dataObj = {};
    }
    PropertiesGetter.prototype.mapKeys = function (props, base) {
        var _this = this;
        if (base === void 0) { base = ''; }
        Object.keys(props).forEach(function (key) {
            var index = _.get(props, key);
            if (typeof props[key] === 'object') {
                _this.mapKeys(props[key], (base ? base + '.' : '') + key);
            }
            else if (/\[[0-9]*\]/.exec(index)) {
                _this.dataObj[key] = _.get(_this.args, index);
            }
            else {
                _this.dataObj[key] = _.get(_this.object, (base ? base + '.' : '') + index);
            }
        });
        return this.dataObj;
    };
    return PropertiesGetter;
}());
export { PropertiesGetter };
//# sourceMappingURL=properties.js.map