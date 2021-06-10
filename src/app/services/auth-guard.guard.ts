import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserAuthService } from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router : Router,
    private authService : UserAuthService
  ){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }
  
}
