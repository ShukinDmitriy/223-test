import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {
  /**
   * добавление Content-Type: application/json ко всем запросам
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body === null || !(req.body instanceof FormData)) {
      const jsonReq = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
      return next.handle(jsonReq);
    }
    return next.handle(req);
  }
}
