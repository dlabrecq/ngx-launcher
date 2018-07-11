import { Component, Host, Input, ViewEncapsulation, SimpleChange } from '@angular/core';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';
import { ProjectSummaryService } from '../../../../..';
var ProjectProgressCreateappNextstepComponent = /** @class */ (function () {
    function ProjectProgressCreateappNextstepComponent(launcherComponent, projectProgressService, projectSummaryService) {
        this.launcherComponent = launcherComponent;
        this.projectProgressService = projectProgressService;
        this.projectSummaryService = projectSummaryService;
    }
    ProjectProgressCreateappNextstepComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var statusLink = changes['statusLink']['currentValue'];
        if (statusLink) {
            this.socket = this.projectProgressService.getProgress(statusLink);
            this.socket.onmessage = function (event) {
                if (!_this._progress) {
                    _this._progress = [];
                    var values = JSON.parse(event.data);
                    console.log('data from Create ws', values);
                    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                        var item = values_1[_i];
                        for (var key in item) {
                            if (item.hasOwnProperty(key)) {
                                _this._progress.push({ key: key, description: item[key] });
                            }
                        }
                    }
                }
                else {
                    var message = JSON.parse(event.data);
                    console.log('data from ws', message);
                    var data = message.data || {};
                    if (data && data.error) {
                        console.log(message.data.error);
                        _this.errorMessage = data.error;
                        for (var i = _this.lastCompleted; i < _this._progress.length; i++) {
                            _this._progress[i].error = true;
                        }
                        _this.socket.close();
                    }
                    else {
                        for (var _a = 0, _b = _this._progress; _a < _b.length; _a++) {
                            var status_1 = _b[_a];
                            if (status_1.key === message.statusMessage) {
                                status_1.completed = true;
                                if (data.location != null) {
                                    status_1.hyperText = data.location;
                                }
                                break;
                            }
                        }
                    }
                }
            };
            this.socket.onerror = function (error) {
                console.log('error in fetching messages in progress Component: Create', error);
            };
            this.socket.onclose = function () {
                console.log('closed the socket call in progress component in Create');
            };
        }
    };
    ProjectProgressCreateappNextstepComponent.prototype.ngOnDestroy = function () {
        if (this.socket) {
            this.socket.close();
        }
    };
    Object.defineProperty(ProjectProgressCreateappNextstepComponent.prototype, "lastCompleted", {
        get: function () {
            return this._progress ? this._progress.findIndex(function (item) { return !item.completed; }) : -1;
        },
        enumerable: true,
        configurable: true
    });
    ProjectProgressCreateappNextstepComponent.prototype.retry = function () {
        var _this = this;
        var failedStep = this.lastCompleted;
        this.projectSummaryService.setup(this.launcherComponent.summary, failedStep).subscribe(function (result) {
            _this._progress = null;
            _this.errorMessage = null;
            _this.ngOnChanges({ 'statusLink': new SimpleChange('', result.uuid_link, false) });
        });
    };
    Object.defineProperty(ProjectProgressCreateappNextstepComponent.prototype, "allCompleted", {
        // Accessors
        get: function () {
            return this._progress ? !this._progress.find(function (item) { return !item.completed; }) : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectProgressCreateappNextstepComponent.prototype, "isError", {
        get: function () {
            return !!this.errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    ProjectProgressCreateappNextstepComponent.prototype.getProgressByKey = function (key) {
        for (var _i = 0, _a = this._progress; _i < _a.length; _i++) {
            var status_2 = _a[_i];
            if (status_2.key === key) {
                return status_2;
            }
        }
        return {};
    };
    Object.defineProperty(ProjectProgressCreateappNextstepComponent.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    ProjectProgressCreateappNextstepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-projectprogress-createapp-nextstep',
                    template: require('./project-progress-createapp-nextstep.component.html'),
                    styles: [require('./project-progress-createapp-nextstep.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    ProjectProgressCreateappNextstepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: ProjectProgressService, },
        { type: ProjectSummaryService, },
    ]; };
    ProjectProgressCreateappNextstepComponent.propDecorators = {
        'statusLink': [{ type: Input },],
    };
    return ProjectProgressCreateappNextstepComponent;
}());
export { ProjectProgressCreateappNextstepComponent };
//# sourceMappingURL=project-progress-createapp-nextstep.component.js.map