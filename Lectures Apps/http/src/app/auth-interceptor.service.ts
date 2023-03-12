import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Estoy en el interceptor');
    const headers = request.headers.append('Auth', 'xyz');
    const authReq = request.clone({ headers });
    return next.handle(authReq);
  }
}
