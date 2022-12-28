import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router){};
  async canActivate(
    next: ActivatedRouteSnapshot,
    //@ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate called');
    let isLoggedIn = this.authService.isAuthenticated();
  //   console.log("isloggedin" + isLoggedIn)
      
  //   if (isLoggedIn && this.router.location._locationStrategy._platformLocation.location.pathname === '/login'){
  //     console.log("isloggedin" + isLoggedIn)
  //     console.log(this.router); 
  //     // await this.router.navigate(['/home']);
  //   } else if (!isLoggedIn && this.router.url !== '/login'){
  //     console.log("isloggedin" + isLoggedIn)

  //     this.router.navigate(['/login']);
  //     console.log("that"+this.router.url);

  //   }
    
  }
    
}
