import { Injector } from '@angular/core';
export declare class StaticInjector {
    private static injector;
    static setInjector(injector: Injector): void;
    static getInjector(): Injector;
}
export declare function broadcast(event: string, properties: any): MethodDecorator;
