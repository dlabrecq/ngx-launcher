import { Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DependencyCheckService } from '../service/dependency-check.service';
export declare class ProjectNameValidatorDirective implements Validator {
    private dependencyCheckService;
    private pattern;
    constructor(dependencyCheckService: DependencyCheckService);
    validate(control: AbstractControl): Observable<{
        [key: string]: any;
    }>;
    validRepositoryName(value: any): Observable<{
        [key: string]: any;
    }>;
    private createError(key, value);
}
