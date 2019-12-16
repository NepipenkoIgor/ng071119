import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../../config';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getTokenFromLocalStorage()
      .pipe(
        switchMap((accessToken: string | null) => {
          let headers: HttpHeaders = req.headers
            .append('Content-type', 'application/json');

          if (req.url !== '/auth/signup' && req.url !== '/auth/signin') {
            headers = headers.append('Authorization', `Bearer ${accessToken}`);
          }
          const jsonReq = req.clone(
            {
              headers,
              url: `${this.baseUrl}${req.url}`
            }
          );
          return next.handle(jsonReq)
            .pipe(
              filter(this.isHttpResponse),
              map((res) => {
                const {data, ...response} = res.body;
                if (data === undefined) {
                  return res.clone({body: response});
                }
                return res.clone({body: data});
              })
            );
        })
      );
  }

  private isHttpResponse(event: HttpEvent<any>): event is HttpResponse<any> {
    if (event instanceof HttpResponse) {
      return true;
    }
    return false;
  }

}
