export declare abstract class LauncherStep {
    /**
     * The step ID
     */
    id: string;
    /**
     * Flag indicating step has been completed
     */
    readonly abstract completed: boolean;
    /**
     * Flag indicating step is hidden
     */
    hidden: boolean;
    /**
     * Flag indicating step is optional
     */
    optional: boolean;
    /**
     * Style class for the step container
     */
    styleClass: string;
    /**
     * Step title
     */
    title: string;
    constructor();
}
