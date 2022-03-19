import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingCustomService } from './loading-custom.service';
@Injectable()
export class LoadingCustomInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingCustomService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ativar o loading
    this.loadingService.show();

    return next.handle(request).pipe(
      tap(
        event => this.handleResponse(request, event),
        error => this.handleError(request, error)
      )
    );
  }

  handleResponse(req: HttpRequest<any>, event) {
    if (event instanceof HttpResponse) {
      // Desativa o Loading
      this.loadingService.hidden();
    }
  }

  handleError(req: HttpRequest<any>, event) {
    // Desativa o Loading
    this.loadingService.hidden();

    // Caso ele perca a autenticação
    if (event instanceof HttpErrorResponse) {
      if (event.status === 401) {
        this.router.navigate(['/auth/logout']);
      }
    }
  }
}
