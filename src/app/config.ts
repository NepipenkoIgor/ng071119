import { environment } from '../environments/environment';
import { InjectionToken } from '@angular/core';


export const BASE_URL = environment.baseUrl;
export const BASE_URL_TOKEN = new InjectionToken(BASE_URL);

export enum Routes {
  LOGIN = 'login',
  SIGNUP = 'signup',
  BACOFFICE = 'backoffice',
}
