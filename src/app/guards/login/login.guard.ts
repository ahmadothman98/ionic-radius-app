import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private authService: AuthService, public router: Router){};

  async canLoad(
    route: Route,
    //@ts-ignore
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      await this.authService.isAuthenticated();
      if(this.authService.isLoggedIn){
        
        this.routeToHome();
      }
      else{
        return true;
      }
  }
  

  routeToHome() {
    this.router.navigate(['/main-view'],  {replaceUrl: true} );
    return false;
  }
}
