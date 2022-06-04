import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService, 
     private router: Router) {}

    canActivate(): boolean {
      if(this.auth.IsLoggedIn()){
        return true;
      }else{
        this.router.navigate(['/auth']);
        return false;
      }
    }
}
