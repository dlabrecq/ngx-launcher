import { OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Progress } from '../../model/progress.model';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';
import { ProjectSummaryService } from '../../../../..';
export declare class ProjectProgressCreateappNextstepComponent implements OnChanges, OnDestroy {
    launcherComponent: LauncherComponent;
    private projectProgressService;
    private projectSummaryService;
    statusLink: string;
    errorMessage: string;
    private _progress;
    private socket;
    constructor(launcherComponent: LauncherComponent, projectProgressService: ProjectProgressService, projectSummaryService: ProjectSummaryService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private readonly lastCompleted;
    retry(): void;
    readonly allCompleted: boolean;
    readonly isError: boolean;
    getProgressByKey(key: string): Progress;
    readonly progress: Progress[];
}
