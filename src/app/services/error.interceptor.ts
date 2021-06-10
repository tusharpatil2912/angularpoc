import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private authService:UserAuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

}