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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Host, ViewChild, ViewEncapsulation } from '@angular/core';
import { DependencyCheckService } from '../../service/dependency-check.service';
import { GitProviderService } from '../../service/git-provider.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';
import { broadcast } from '../../shared/telemetry.decorator';
var GitproviderCreateappStepComponent = /** @class */ (function (_super) {
    __extends(GitproviderCreateappStepComponent, _super);
    function GitproviderCreateappStepComponent(launcherComponent, dependencyCheckService, gitProviderService) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.dependencyCheckService = dependencyCheckService;
        _this.gitProviderService = gitProviderService;
        _this.subscriptions = [];
        return _this;
    }
    GitproviderCreateappStepComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.launcherComponent.summary.gitHubDetails.login) {
            setTimeout(function () {
                if (_this.versionSelect) {
                    _this.versionSelect.nativeElement.focus();
                }
            }, 10);
        }
    };
    GitproviderCreateappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        this.subscriptions.push(this.gitProviderService.getGitHubDetails().subscribe(function (val) {
            if (val !== undefined) {
                _this.launcherComponent.summary.gitHubDetails = val;
                _this.getGitHubRepos();
            }
        }));
    };
    GitproviderCreateappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    Object.defineProperty(GitproviderCreateappStepComponent.prototype, "completed", {
        // Accessors
        /**
         * Returns indicator that step is completed
         *
         * @returns {boolean} True if step is completed
         */
        get: function () {
            return this.form.valid;
        },
        enumerable: true,
        configurable: true
    });
    // Steps
    /**
     * Navigate to next step
     */
    GitproviderCreateappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('GitProvider');
        var summary = this.launcherComponent.summary;
    };
    GitproviderCreateappStepComponent.prototype.showStep = function (id, reset) {
        if (reset) {
            this.launcherComponent.summary.gitHubDetails.repository = undefined;
        }
        this.launcherComponent.showStep(id);
    };
    /**
     * Authorize GitHub account
     *
     * @param {MouseEvent} $event
     */
    GitproviderCreateappStepComponent.prototype.connectAccount = function ($event) {
        var url = window.location.href + this.getParams(this.launcherComponent.currentSelection);
        this.gitProviderService.connectGitHubAccount(url);
    };
    /**
     * get all repos List for the selected organization
     */
    GitproviderCreateappStepComponent.prototype.getGitHubRepos = function () {
        if (this.launcherComponent && this.launcherComponent.summary &&
            this.launcherComponent.summary.gitHubDetails) {
            this.launcherComponent.summary.gitHubDetails.repository =
                this.launcherComponent.summary.dependencyCheck ?
                    this.launcherComponent.summary.dependencyCheck.projectName : '';
        }
    };
    // Private
    GitproviderCreateappStepComponent.prototype.getParams = function (selection) {
        if (selection === undefined) {
            return '';
        }
        return '?selection=' + encodeURI(JSON.stringify(selection));
    };
    GitproviderCreateappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-gitprovider-createapp-step',
                    template: require('./gitprovider-createapp-step.component.html'),
                    styles: [require('./gitprovider-createapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    GitproviderCreateappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: DependencyCheckService, },
        { type: GitProviderService, },
    ]; };
    GitproviderCreateappStepComponent.propDecorators = {
        'form': [{ type: ViewChild, args: ['form',] },],
        'versionSelect': [{ type: ViewChild, args: ['versionSelect',] },],
    };
    __decorate([
        broadcast('completeGitProviderStep_Create', {
            'launcherComponent.summary.gitHubDetails': {
                location: 'organization',
                repository: 'repository',
                username: 'login'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitproviderCreateappStepComponent.prototype, "navToNextStep", null);
    return GitproviderCreateappStepComponent;
}(LauncherStep));
export { GitproviderCreateappStepComponent };
//# sourceMappingURL=gitprovider-createapp-step.component.js.map