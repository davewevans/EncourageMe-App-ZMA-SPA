import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.authService.isEmailTaken(ctrl.value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(isTaken => (isTaken ? { emailTaken: true } : null)),
      catchError(() => null)
    );
  }
}
