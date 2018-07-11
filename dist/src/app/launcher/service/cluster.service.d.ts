import { Observable } from 'rxjs/Observable';
import { Cluster } from '../model/cluster.model';
/**
 * Abstract Cluster provider service provided to ensure consumer implements this pattern
 */
export declare abstract class ClusterService {
    /**
     * Retrieve cluster list
     * @returns {Observable<Cluster[]>}
     */
    abstract getClusters(): Observable<Cluster[]>;
}
