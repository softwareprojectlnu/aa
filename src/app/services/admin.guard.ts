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

  /*
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.user = this.userStore.select('user');
      return this.user.map(user => user && user.role === 'ADMIN');
    }
  }
  */
  canActivate(appRoutes, state: RouterStateSnapshot) {
    return this.auth.user.map((user) => {
      if (user && user.isAdmin) {
        return true;
      }
      this.appRoutes.navigate(['login']);
    });
  }


}
