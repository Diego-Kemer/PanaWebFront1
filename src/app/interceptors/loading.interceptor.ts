import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { UiServiceService } from '../services/ui-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private uiServ: UiServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.uiServ.show()
    return next.handle(request).pipe(
      finalize(()=> this.uiServ.hidden())
    );
  }
}
