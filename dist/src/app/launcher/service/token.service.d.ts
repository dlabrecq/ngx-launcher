import { Cluster } from '../model/cluster.model';
import { Observable } from 'rxjs';
export declare abstract class TokenService {
    readonly abstract clusters: Observable<Cluster[]>;
    abstract createOathLink(cluster: string): string;
}
