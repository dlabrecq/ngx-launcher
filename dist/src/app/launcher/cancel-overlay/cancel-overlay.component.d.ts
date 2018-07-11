import { OnInit } from '@angular/core';
import { LauncherComponent } from '../launcher.component';
export declare class CancelOverlayComponent implements OnInit {
    launcherComponent: LauncherComponent;
    constructor(launcherComponent: LauncherComponent);
    ngOnInit(): void;
    /**
     * Cancel aborted
     */
    cancelAborted(): void;
    /**
     * Cancel confirmed
     */
    cancelConfirmed(): void;
}
