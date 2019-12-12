import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../../config';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IStore } from '../../store';
import { signupPending } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<IStore>,
  ) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', {
        validators: [
          Validators.required, Validators.minLength(6), this.usernameValidator
        ],
        asyncValidators: [this.checkUserNameValidator.bind(this)]
      }],
      male: [true],
      emails: this.fb.array([['', Validators.email]]),
      password: this.fb.group({
        password: [''],
        cpassword: [''],
      }, {
        validators: [this.equalValidator]
      }),
    });
  }

  signup({username, password: {password}}: any) {
    this.store.dispatch(signupPending({user: {username, password}}));
  }

  goToLogin() {
    this.router.navigate([`/${Routes.LOGIN}`]);
  }

  usernameValidator({value}: FormControl): ValidationErrors | null {
    const valid: boolean = /^[a-zA-Z]*$/.test(value);
    return valid
      ? null
      : {
        onlyLetters: 'No special symbols'
      };
  }

  equalValidator(control: FormGroup): ValidationErrors | null {
    const {password, cpassword} = control.value;
    return password !== cpassword
      ? {
        isNotEqual: 'Fields are not equal'
      }
      : null;
  }


  checkUserNameValidator({value}: FormControl): Observable<ValidationErrors | null> {
    return of(value)
      .pipe(
        delay(4000),
        switchMap((name) => {
          if (name === 'inepipenko') {
            return of({
              userExist: 'User exist'
            });
          }
          return of(null);
        })
        // switchMap(() => {
        //   return this.http.post<{ data: null, [key: string]: any }>('/auth/checkUsername', {username: value})
        //     .pipe(
        //       map((res) => {
        //         if (res === null) {
        //           return res;
        //         }
        //         return res;
        //       })
        //     );
        // })
      );
  }

  getControls(control: AbstractControl, path: string): AbstractControl[] {
    return (control.get(path) as FormArray).controls;
  }

  addEmail(): void {
    (this.signupForm.get('emails') as FormArray).push(this.fb.control('', [Validators.email]));
  }

  removeEmail(index: number) {
    (this.signupForm.get('emails') as FormArray).removeAt(index);
  }

}
