import * as _ from 'lodash';
import { Broadcaster } from 'ngx-base';
import { PropertiesGetter } from './properties';
var StaticInjector = /** @class */ (function () {
    function StaticInjector() {
    }
    StaticInjector.setInjector = function (injector) {
        StaticInjector.injector = injector;
    };
    StaticInjector.getInjector = function () {
        return StaticInjector.injector;
    };
    StaticInjector.injector = null;
    return StaticInjector;
}());
export { StaticInjector };
export function broadcast(event, properties) {
    return function (target, methodName, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var injectorInstance = StaticInjector.getInjector();
            if (!injectorInstance || !injectorInstance.get(Broadcaster)) {
                return originalMethod.apply(this, args);
            }
            var broadcast = injectorInstance.get(Broadcaster);
            var values = new PropertiesGetter(this, args).mapKeys(_.cloneDeep(properties));
            broadcast.broadcast(event, values);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
//# sourceMappingURL=telemetry.decorator.js.map