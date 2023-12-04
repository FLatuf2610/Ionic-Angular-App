import { Injectable } from '@angular/core';
import { Route, CanLoad, UrlTree, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  
  constructor(private _AuthService:AuthService, private router:Router){}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (!this._AuthService.isLogged){
      this.router.navigateByUrl('/auth');
    }
    return this._AuthService.isLogged
  }

  
}
