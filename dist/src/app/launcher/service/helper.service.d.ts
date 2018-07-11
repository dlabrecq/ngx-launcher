import { Config } from '../../../app/service/config.component';
export declare class HelperService {
    private config;
    private keys;
    constructor(config: Config);
    getBackendUrl(): string;
    getOrigin(): string;
}
