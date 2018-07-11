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
var GitproviderImportappStepComponent = /** @class */ (function (_super) {
    __extends(GitproviderImportappStepComponent, _super);
    function GitproviderImportappStepComponent(launcherComponent, dependencyCheckService, gitProviderService) {
        var _this = _super.call(this) || this;
        _this.launcherComponent = launcherComponent;
        _this.dependencyCheckService = dependencyCheckService;
        _this.gitProviderService = gitProviderService;
        _this.subscriptions = [];
        return _this;
    }
    GitproviderImportappStepComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.launcherComponent.summary.gitHubDetails.login) {
            setTimeout(function () {
                _this.versionSelect.nativeElement.focus();
            }, 10);
        }
    };
    GitproviderImportappStepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.launcherComponent.addStep(this);
        this.subscriptions.push(this.gitProviderService.getGitHubDetails().subscribe(function (val) {
            if (val !== undefined) {
                _this.launcherComponent.summary.gitHubDetails = val;
                _this.getGitHubRepos();
            }
        }));
    };
    GitproviderImportappStepComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
        if (this.gitHubReposSubscription !== undefined) {
            this.gitHubReposSubscription.unsubscribe();
        }
    };
    Object.defineProperty(GitproviderImportappStepComponent.prototype, "completed", {
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
    GitproviderImportappStepComponent.prototype.navToNextStep = function () {
        this.launcherComponent.navToNextStep('GitProvider');
    };
    GitproviderImportappStepComponent.prototype.showStep = function (id, reset) {
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
    GitproviderImportappStepComponent.prototype.connectAccount = function ($event) {
        var url = window.location.href + this.getParams(this.launcherComponent.currentSelection);
        this.gitProviderService.connectGitHubAccount(url);
    };
    /**
     * Ensure repo name is available for the selected organization
     */
    GitproviderImportappStepComponent.prototype.getGitHubRepos = function () {
        var _this = this;
        var org = '';
        if (this.launcherComponent && this.launcherComponent.summary &&
            this.launcherComponent.summary.gitHubDetails) {
            org = this.launcherComponent.summary.gitHubDetails.organization;
            this.launcherComponent.summary.gitHubDetails.repository = '';
            this.launcherComponent.summary.gitHubDetails.repositoryList = [];
        }
        if (this.gitHubReposSubscription !== undefined) {
            this.gitHubReposSubscription.unsubscribe();
        }
        this.gitHubReposSubscription = this.gitProviderService.getGitHubRepoList(org).subscribe(function (val) {
            if (val !== undefined && _this.launcherComponent && _this.launcherComponent.summary &&
                _this.launcherComponent.summary.gitHubDetails) {
                _this.launcherComponent.summary.gitHubDetails.repositoryList = val;
            }
        });
    };
    // Private
    GitproviderImportappStepComponent.prototype.getParams = function (selection) {
        if (selection === undefined) {
            return '';
        }
        return '?selection=' + JSON.stringify(selection);
    };
    /**
     * Helper to retrieve request parameters
     *
     * @param name The request parameter to retrieve
     * @returns {any} The request parameter value or null
     */
    GitproviderImportappStepComponent.prototype.getRequestParam = function (name) {
        var search = (window.location.search !== undefined && window.location.search.length > 0)
            ? window.location.search : window.location.href;
        var param = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(search);
        if (param !== null) {
            return decodeURIComponent(param[1]);
        }
        return null;
    };
    GitproviderImportappStepComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'f8launcher-gitprovider-importapp-step',
                    template: require('./gitprovider-importapp-step.component.html'),
                    styles: [require('./gitprovider-importapp-step.component.css').toString()]
                },] },
    ];
    /** @nocollapse */
    GitproviderImportappStepComponent.ctorParameters = function () { return [
        { type: LauncherComponent, decorators: [{ type: Host },] },
        { type: DependencyCheckService, },
        { type: GitProviderService, },
    ]; };
    GitproviderImportappStepComponent.propDecorators = {
        'form': [{ type: ViewChild, args: ['form',] },],
        'versionSelect': [{ type: ViewChild, args: ['versionSelect',] },],
    };
    __decorate([
        broadcast('completeGitProviderStep_Import', {
            'launcherComponent.summary.gitHubDetails': {
                location: 'organization',
                repository: 'repository',
                username: 'login'
            }
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GitproviderImportappStepComponent.prototype, "navToNextStep", null);
    return GitproviderImportappStepComponent;
}(LauncherStep));
export { GitproviderImportappStepComponent };
//# sourceMappingURL=gitprovider-importapp-step.component.js.map