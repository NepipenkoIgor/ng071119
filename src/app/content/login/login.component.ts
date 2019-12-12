import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../store';
import { loginPending } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public constructor(
    private readonly store: Store<IStore>
  ) {
  }

  public login(user: { username: string, password: string }): void {
    this.store.dispatch(loginPending({user}));
  }

}
