import { Provider } from '@angular/core';
import { DependencyEditorModule, DependencyEditorTokenProvider, URLProvider } from 'fabric8-analytics-dependency-editor';
export declare const providers: Provider[];
export declare class LauncherModule {
}
export { Cluster } from './model/cluster.model';
export { DependencyCheck } from './model/dependency-check.model';
export { GitHubDetails } from './model/github-details.model';
export { Mission } from './model/mission.model';
export { Pipeline } from './model/pipeline.model';
export { Progress } from './model/progress.model';
export { Runtime } from './model/runtime.model';
export { Summary } from './model/summary.model';
export { TargetEnvironment } from './model/target-environment.model';
export { ClusterService } from './service/cluster.service';
export { DependencyCheckService } from './service/dependency-check.service';
export { DependencyEditorService } from './service/dependency-editor.service';
export { GitProviderService } from './service/git-provider.service';
export { MissionRuntimeService } from './service/mission-runtime.service';
export { PipelineService } from './service/pipeline.service';
export { ProjectProgressService } from './service/project-progress.service';
export { ProjectSummaryService } from './service/project-summary.service';
export { TargetEnvironmentService } from './service/target-environment.service';
export { TokenService } from './service/token.service';
export { HelperService } from './service/helper.service';
export { DependencyEditorModule, URLProvider, DependencyEditorTokenProvider };
