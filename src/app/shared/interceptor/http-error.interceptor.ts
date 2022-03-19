
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetalertCustom } from '../utils/sweetalert-custom';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((httpErrorResponse) => {
                    if (httpErrorResponse.error instanceof ErrorEvent) {
                        // Este é um erro do lado do cliente.
                        SweetalertCustom.showAlertConfirm(`Falha na operação.`, { type: 'error' }, 'Ok', 'Contate o administrador do sistema.');
                    } else {
                        // Este é um erro do lado do servidor.
                        if (httpErrorResponse.error.detalhes) {
                            SweetalertCustom.showAlertConfirm(httpErrorResponse.error.detalhes[0], { type: 'error' });
                        } else {
                            SweetalertCustom.showAlertConfirm(`Falha na operação.`, { type: 'error' });
                        }
                    }
                    return throwError(httpErrorResponse.error);
                })
            );
    }
}
