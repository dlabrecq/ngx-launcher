import { ValidatorFn, AbstractControl, Validator } from '@angular/forms';
export declare class ExistingRepositoryValidatorDirective implements Validator {
    repoList: string[];
    validate(control: AbstractControl): {
        [key: string]: any;
    } | null;
}
export declare function repositoryValidator(repoList: string[]): ValidatorFn;
