import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

/* Validates passwords match */
export const passwordMatchValidator: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {

    const password = fg.get('password');
    const passwordConfirm = fg.get('passwordConfirm');

    const controlsValid = password.valid && passwordConfirm.valid;

    return controlsValid && password && passwordConfirm && password.value
        !== passwordConfirm.value ? { 'mismatchPasswords': true } : null;
};
