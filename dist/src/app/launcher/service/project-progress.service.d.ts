/**
 * Abstract project progress service provided to ensure consumer implements this pattern
 */
export declare abstract class ProjectProgressService {
    /**
     * Retrieve progress list
     * @returns {Observable<Progress[]>}
     */
    abstract getProgress(uuidLink: string): WebSocket;
}
