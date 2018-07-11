import { Input } from '@angular/core';
var LauncherStep = /** @class */ (function () {
    function LauncherStep() {
        /**
         * Flag indicating step is hidden
         */
        this.hidden = false;
        /**
         * Flag indicating step is optional
         */
        this.optional = false;
    }
    LauncherStep.propDecorators = {
        'id': [{ type: Input },],
        'hidden': [{ type: Input },],
        'optional': [{ type: Input },],
        'styleClass': [{ type: Input },],
        'title': [{ type: Input },],
    };
    return LauncherStep;
}());
export { LauncherStep };
//# sourceMappingURL=launcher-step.js.map