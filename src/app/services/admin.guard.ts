import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Users} from '../Users';
import {Store} from '@ngrx/store';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminGuard implements CanActivate {
  user: Observable<Users>;

  constructor(private auth: AuthService, private appRoutes: Router) {
  }

  canActivate(appRoutes, state: RouterStateSnapshot) {
    return this.auth.user.map((user) => {
      if (user && user.isAdmin === 'true') {
        return true;
      }
      this.appRoutes.navigate(['login']);
    });
  }



}
