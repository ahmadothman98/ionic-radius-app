import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, public router: Router){};

  async canLoad(
    route: Route,
    // @ts-ignore
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      await this.authService.isAuthenticated();
      if(!this.authService.isLoggedIn){
        
        this.routeToLogin();
      }
      else{
        return true;
      }
  }

  private routeToLogin() {
    this.router.navigate(['/login'],  {replaceUrl: true} );
    return false;
  }
 
}
