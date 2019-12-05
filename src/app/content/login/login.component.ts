import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounce, filter, map, switchMap, take } from 'rxjs/operators';
import { interval, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor() {
    const int$ = of(1, 2, 3, 4, '5', 6, 7, 8)
      .pipe(
        // filter((num: number) => num  === 0),
        switchMap((value) => {
          return of(value)
            .pipe(
              map((num: number) => num.toFixed()),
              take(7),
              catchError((err) => {
                return of(0);
              })
            );
        }),
      );

    int$.subscribe((num: string) => {
      console.log(num);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });
  }

  public login(loginObj: { username: string, password: string }): void {
    console.log(loginObj);
  }


}
