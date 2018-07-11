export declare class TokenProvider {
    getToken(): string | Promise<string>;
    getGitHubToken(): string | Promise<string>;
    isPromise(token: string | Promise<string>): token is Promise<string>;
    readonly token: Promise<string>;
    readonly gitHubToken: Promise<string>;
}
