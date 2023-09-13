import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
/* import { LoginService } from './services/login.service'; */
import { LoginServiceMock } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: /* LoginService || */ LoginServiceMock
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isUserLogged()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
    return true;
  }
}
