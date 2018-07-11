import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Progress } from '../../model/progress.model';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';
export declare class ProjectProgressImportappNextstepComponent implements OnInit, OnChanges, OnDestroy {
    launcherComponent: LauncherComponent;
    private projectProgressService;
    statusLink: string;
    isError: boolean;
    errorMessage: string;
    private _progress;
    private socket;
    constructor(launcherComponent: LauncherComponent, projectProgressService: ProjectProgressService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    readonly allCompleted: boolean;
    readonly progress: Progress[];
    private closeConnections();
    private reset();
}
