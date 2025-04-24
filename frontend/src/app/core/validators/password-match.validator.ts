import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(
    controlName: string,
    matchingControlName: string
): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);

        if (!control || !matchingControl) return null;

        const mismatch = control.value !== matchingControl.value;
        return mismatch ? { [matchingControlName + 'Mismatch']: true } : null;
    };
}
