import { Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GitProviderService } from '../../service/git-provider.service';
export declare class GitProviderRepositoryValidatorDirective implements Validator {
    private gitProvider;
    private pattern;
    constructor(gitProvider: GitProviderService);
    validate(control: AbstractControl): Observable<{
        [key: string]: any;
    }>;
    validRepositoryName(control: AbstractControl): Observable<{
        [key: string]: any;
    }>;
    private createError(key, value);
}
