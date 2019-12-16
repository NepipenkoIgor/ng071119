import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserState } from '../../store/reducers/user.reducer';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public login(user: { username: string, password: string }) {
    return this.http.post('/auth/signin', {...user});
  }

  public signup(user: any) {
    return this.http.post('/auth/signup', {...user});
  }
  public checkJWT() {
    return this.http.get('/user/checkuser');
  }

  public tokenToLocalStorage(user: IUserState): Observable<IUserState | null> {
    if (!user || !user.accessToken) {
      return of(null);
    }
    localStorage.setItem('accessToken', user.accessToken);
    return of(user);
  }

  public getTokenFromLocalStorage(): Observable<string | null> {
    return of(localStorage.getItem('accessToken'));
  }
  public removeTokenFromLocalStorage(): Observable<boolean> {
    localStorage.removeItem('accessToken');
    return of(true);
  }
}
