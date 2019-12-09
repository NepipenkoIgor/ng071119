import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public login(loginObj: { username: string, password: string }): void {
    console.log(loginObj);
  }

}
