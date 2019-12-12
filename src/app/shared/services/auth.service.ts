import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
