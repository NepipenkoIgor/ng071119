import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../../config';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    @Inject(BASE_URL_TOKEN) private baseUrl: string
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // req.clone({responseType: 'json'});
    const headers: HttpHeaders = req.headers
      .append('Content-type', 'application/json');
      // .append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlnb3Jwcm9kIiwiaWF0IjoxNTc1MzExMDAwfQ.LHNSiWnhIgARfpuygLvdNw3oAcwcogD4SRXd06MJsWc');
    console.log(req.body)
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
          console.log(res)
          const {data, ...response} = res.body;
          console.log(data, response);
          if (data === undefined) {
            return res.clone({body: response});
          }
          return res.clone({body: data});
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
