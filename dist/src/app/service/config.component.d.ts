export declare class Config {
    protected settings: any;
    load(): Promise<any>;
    set(settings: any): void;
    get(key: string): string;
}
