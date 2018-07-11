import { Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';
var ProjectProgressImportappNextstepComponent = /** @class */ (function () {
    function ProjectProgressImportappNextstepComponent(launcherComponent, projectProgressService) {
        this.launcherComponent = launcherComponent;
        this.projectProgressService = projectProgressService;
        this.isError = false;
        this.errorMessage = '';
    }
    ProjectProgressImportappNextstepComponent.prototype.ngOnInit = function () {
    };
    ProjectProgressImportappNextstepComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var statusLink = changes['statusLink']['currentValue'];
        if (statusLink) {
            this.socket = this.projectProgressService.getProgress(statusLink);
            this.socket.onmessage = function (event) {
                if (!_this._progress) {
                    _this._progress = [];
                    var values = JSON.parse(event.data);
                    console.log('data from Import ws', values);
                    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                        var item = values_1[_i];
                        for (var key in item) {
                            if (item.hasOwnProperty(key)) {
                                var status_1 = { key: key, description: item[key] };
                                if (status_1['key'] !== 'GITHUB_CREATE' && status_1['key'] !== 'GITHUB_PUSHED') {
                                    _this._progress.push(status_1);
                                }
                            }
                        }
                    }
                }
                else {
                    var message = JSON.parse(event.data);
                    var data = message.data || {};
                    if (data && data.error) {
                        _this.isError = true;
                        _this.errorMessage = data.error;
                    }
                    else {
                        for (var _a = 0, _b = _this._progress; _a < _b.length; _a++) {
                            var status_2 = _b[_a];
                            if (status_2.key === message.statusMessage) {
                                status_2.completed = true;
                                if (data.location) {
                                    status_2.hyperText = data.location;
                                }
                                break;
                            }
                        }
                    }
                }
            };
            this.socket.onerror = function (error) {
                console.log('error in fetching messages in progress Component: Import', error);
            };
            this.socket.onclose = function () {
                console.log('socket call closed in progress component in Import');
            };
        }
    };
    ProjectProgressImportappNextstepComponent.prototype.ngOnDestroy = function () {
        this.closeConnections();
    };
    Object.defineProperty(ProjectProgressImportappNextstepComponent.prototype, "allCompleted", {
        // Accessors
        get: function () {
            if (this._progress === undefined) {
                return false;
            }
            var result = true;
            for (var i = 0; i < this._progress.length; i++) {
                if (this._progress[i].completed !== true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectProgressImportappNextstepComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    ProjectProgressImportappNextstepComponent.prototype.closeConnections = function () {
        if (this.socket) {
            this.socket.close();
        }
    };
    ProjectProgressImportappNextstepComponent.prototype.reset = function () {
        this.isError = false;
        this.errorMessage = '';
    };
    ProjectProgressImportappNextstepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-projectprogress-importapp-nextstep',
                    template: require('./project-progress-importapp-nextstep.component.html'),
                    styles: [require('./project-progress-importapp-nextstep.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ProjectProgressImportappNextstepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: ProjectProgressService, },
    ]; };
    ProjectProgressImportappNextstepComponent.propDecorators = {
        'statusLink': [{ type: Input },],
    };
    return ProjectProgressImportappNextstepComponent;
}());
export { ProjectProgressImportappNextstepComponent };
//# sourceMappingURL=project-progress-importapp-nextstep.component.js.map