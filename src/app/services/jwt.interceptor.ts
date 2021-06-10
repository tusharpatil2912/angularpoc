import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService:UserAuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = req.url.startsWith(environment.rootURL);
        if(isLoggedIn && isApiUrl){
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(req);
    }

}